export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpHtml(otp) {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Your OTP Code</h2>
            <p>Use the code below to verify your email address:</p>
            <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otp}</div>
        </div>
    `;
}

export function newloginAlert(email) {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New Login Alert</h2>
            <p>Your account on the Dada Authentication system was accessed from a new device.</p>
            <p>If this was you, you can ignore this message.</p>
            <p>If this was not you, please change your password immediately.</p>
            <p>Account: ${email}</p>
        </div>
    `;
}