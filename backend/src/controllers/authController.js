import Usermodel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Session from "../models/sessionModel.js";
import { sendEmail } from "../../services/emailServices.js";
import Otpmodel from "../models/otpModel.js";
import { generateOtp, getOtpHtml, newloginAlert } from "../utils/utils.js";
function getTokenSecrets() {
    return {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || process.env.jwt_secret,
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || process.env.jwt_secret
    };
}

export async function register(req, res) {
    try {
        const { accessTokenSecret, refreshTokenSecret } = getTokenSecrets();

        if (!accessTokenSecret || !refreshTokenSecret) {
            return res.status(500).json({ message: 'Token secrets are not configured in environment variables' });
        }

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }
        const normalizedEmail = email.toLowerCase();

        const existingUser = await Usermodel.findOne({
            $or: [{ email: normalizedEmail }, { username }]
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Usermodel({ username, email: normalizedEmail, password: hashedPassword });
        await newUser.save();
        const otp = generateOtp();
        const otpHtml = getOtpHtml(otp);
        const hashedOtp = await bcrypt.hash(otp, 10);
        const otpEntry = new Otpmodel({
            email: normalizedEmail,
            userId: newUser._id,
            otp: hashedOtp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        });
        await otpEntry.save();
        await sendEmail(email, 'Your OTP Code', `Your OTP code is: ${otp}`, otpHtml);
        res.status(201).json({ message: 'User registered successfully', user: { username: newUser.username, email: newUser.email, verified: newUser.verified } });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { accessTokenSecret, refreshTokenSecret } = getTokenSecrets();
        if (!accessTokenSecret || !refreshTokenSecret) {
            return res.status(500).json({ message: 'Token secrets are not configured in environment variables' });
        }
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const normalizedEmail = email.toLowerCase();

        const user = await Usermodel.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        if (!(user.verified || user.varified)) {
            return res.status(403).json({ message: 'Email not verified. Please verify your email before logging in.' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const refreshtoken = jwt.sign({ userId: user._id }, refreshTokenSecret, { expiresIn: '7d' });
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        if (user.verified) {
            const alertHtml = newloginAlert(email);
            await sendEmail(email, 'New Login Alert', 'Your account on Dada Authentication system was accessed from a new device. If this was you, you can safely ignore this message. If you did not log in, please change your password immediately and review your active sessions.', alertHtml);
        }
        const refreshtokenhash = await bcrypt.hash(refreshtoken, 10);
        const session = await Session.create({
            userId: user._id,
            refreshTokenhash: refreshtokenhash,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });
        await session.save();
        const accesstoken = jwt.sign({ userId: user._id, sessionId: session._id }, accessTokenSecret, { expiresIn: '15m' });

        res.status(200).json({ message: 'Logged in successfully', user: { username: user.username, email: user.email }, accesstoken });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}

export async function getMe(req, res) {
    try {
        const { accessTokenSecret } = getTokenSecrets();

        if (!accessTokenSecret) {
            return res.status(500).json({ message: 'Access token secret is not configured in environment variables' });
        }

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }
        const decoded = jwt.verify(token, accessTokenSecret);
        const user = await Usermodel.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
}

export async function refreshToken(req, res) {
    try {
        const { accessTokenSecret, refreshTokenSecret } = getTokenSecrets();

        if (!accessTokenSecret || !refreshTokenSecret) {
            return res.status(500).json({ message: 'Token secrets are not configured in environment variables' });
        }

        const refreshToken = req.cookies.refreshtoken;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token missing' });
        }
        const decoded = jwt.verify(refreshToken, refreshTokenSecret);
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        const session = await Session.findOne({ userId: decoded.userId, revoked: false }).sort({ createdAt: -1 });
        if (!session) {
            return res.status(401).json({ message: 'No active session found for this user' });
        }
        const user = await Usermodel.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newAccessToken = jwt.sign({ userId: user._id }, accessTokenSecret, { expiresIn: '15m' });
        const newrefreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, { expiresIn: '7d' });
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('refreshtoken', newrefreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        const newrefreshTokenHash = await bcrypt.hash(newrefreshToken, 10);
        session.refreshTokenhash = newrefreshTokenHash;
        await session.save();
        res.status(200).json({ message: 'Token refreshed successfully', accesstoken: newAccessToken });
    } catch (error) {
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }

        res.status(500).json({ message: 'Error refreshing token', error: error.message });
    }
}

export async function logout(req, res) {
    try {
        const { refreshTokenSecret } = getTokenSecrets();
        if (!refreshTokenSecret) {
            return res.status(500).json({ message: 'Refresh token secret is not configured in environment variables' });
        }

        const refreshToken = req.cookies.refreshtoken;
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token missing' });
        }

        const decoded = jwt.verify(refreshToken, refreshTokenSecret);

        const activeSessions = await Session.find({ userId: decoded.userId, revoked: false }).sort({ createdAt: -1 });
        for (const session of activeSessions) {
            const isTokenMatch = await bcrypt.compare(refreshToken, session.refreshTokenhash);
            if (isTokenMatch) {
                session.revoked = true;
                await session.save();
                break;
            }
        }

        const isProduction = process.env.NODE_ENV === 'production';
        res.clearCookie('refreshtoken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax'
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }

        res.status(500).json({ message: 'Error logging out', error: error.message });
    }
}

export async function logoutAll(req, res) {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Authenticated user not found' });
        }

        await Session.updateMany({ userId, revoked: false }, { revoked: true });
        const isProduction = process.env.NODE_ENV === 'production';
        res.clearCookie('refreshtoken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax'
        });
        res.status(200).json({ message: 'Logged out from all sessions successfully' });
    } catch (error) {
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid or expired access token' });
        }
        res.status(500).json({ message: 'Error logging out from all sessions', error: error.message });
    }
}

export async function verifyEmail(req, res) {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        const normalizedEmail = email.toLowerCase();

        const otpEntry = await Otpmodel.findOne({ email: normalizedEmail }).sort({ createdAt: -1 });
        if (!otpEntry) {
            return res.status(400).json({ message: 'OTP not found for this email' });
        }
        if (otpEntry.expiresAt < new Date()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }
        const isOtpValid = await bcrypt.compare(otp, otpEntry.otp);
        if (!isOtpValid) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        const user = await Usermodel
            .findByIdAndUpdate(
                otpEntry.userId,
                { $set: { verified: true, varified: true } },
                { new: true }
            )
            .select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await Otpmodel.deleteMany({ email: normalizedEmail });
        res.status(200).json({ message: 'Email verified successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying email', error: error.message });
    }
}