import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usermodel', required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true }
}, { timestamps: true });

const Otpmodel = mongoose.model('Otp', otpSchema);
export default Otpmodel;