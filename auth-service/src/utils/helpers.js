const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { APP_SECRET } = require('../config');

module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt()
};

module.exports.GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};

module.exports.GenerateResetToken = async () => {
    return await crypto.randomBytes(20).toString('hex');
};

module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
    return await this.GeneratePassword(enteredPassword, salt) === savedPassword;
};

module.exports.GenerateSignature = (payload) => {
    return jwt.sign(payload, APP_SECRET, { expiresIn: '1d' })
};

module.exports.ValidateSignature = async (req) => {
    const signature = req.get('Authorization');
    if (signature) {
        try {
            const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);
            req.user = payload;
            return true;
        } catch (error) {
            return false;
        };
    }
    return false
};

module.exports.GetErrorFileName = () => {
    const errorDate = new Date();
    const fileName = errorDate.getFullYear() + "-" + errorDate.getMonth() + "-" + errorDate.getDate() + "-" + "errors.log";
    return fileName;
}

module.exports.GetRequestFileName = () => {
    const errorDate = new Date();
    const fileName = errorDate.getFullYear() + "-" + errorDate.getMonth() + "-" + errorDate.getDate() + "-" + "requests.log";
    return fileName;
}
