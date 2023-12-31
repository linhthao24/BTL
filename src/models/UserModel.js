const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        BasePass: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: String, require: true },
        access_token: { type: String, require: true },
        refresh_token: { type: String, require: true },
        point: { type: Number, default: 0 }
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;