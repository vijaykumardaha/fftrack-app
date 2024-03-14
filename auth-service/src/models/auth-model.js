const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    resetToken: { type: String, default: null },
    resetExpires: { type: Date, default: null },
    salt: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('auth', AuthSchema);
