import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);
export default UserDetails;