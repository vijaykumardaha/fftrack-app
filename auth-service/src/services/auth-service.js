const { getOne, save } = require("../repositories/auth-repository");
const { CustomError } = require('../utils/handlers');
const { STATUS_CODES, ERROR_MESSAGES } = require('../utils/constant');
const { 
    ValidatePassword, GenerateSignature, 
    GenerateResetToken, GeneratePassword 
} = require('../utils/helpers');

const createAction = async (userData) => {
    try {
        return await save(userData);
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
}

const loginAction = async (req) => {
    try {
        const { username, password } = req.body;
        const userObj = await getOne({ username });
        if (userObj) {
            const validPassword = await ValidatePassword(password, userObj.password, userObj.salt);
            if (validPassword) {
                const token = await GenerateSignature({ username });
                return { token };
            }
            throw new CustomError(true, [], ERROR_MESSAGES.INVALID_PASSWORD, STATUS_CODES.UN_AUTHORISED);
        }
        throw new CustomError(true, [], ERROR_MESSAGES.INVALID_EMAIL, STATUS_CODES.UN_AUTHORISED);
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
}

const forgetAction = async (req) => {
    try {
        const { username } = req.body;
        const user = await getOne({ username });
        if (!user) {
            throw new CustomError(true, [], ERROR_MESSAGES.INVALID_EMAIL, STATUS_CODES.BAD_REQUEST);
        }
        const resetToken = await GenerateResetToken();
        const resetExpires = Date.now() + 3600000; // 1 hour
        return await update({ resetToken, resetExpires }, { username });
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
}

const resetAction = async (req) => {
    try {
        const { token, password } = req.body;
        const userObj = await getOne({ resetToken: token, resetExpires: { $gt: Date.now() } });
        if (!userObj) {
            throw new CustomError(true, [], ERROR_MESSAGES.INVALID_RESET_TOKEN, STATUS_CODES.BAD_REQUEST);
        }

        const salt = await GenerateSalt();
        const hashPassword = await GeneratePassword(password.toString(), salt);
        return await update({ password: hashPassword, salt, resetToken: null }, { username: userObj.username });
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
}

module.exports = {
    loginAction,
    forgetAction,
    resetAction,
    createAction
};

