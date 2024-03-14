const { loginAction, forgetAction, resetAction } = require("../services/auth-service");
const { CustomResponse } = require('../utils/handlers');
const { SUCCESS_MESSAGES } = require('../utils/constant');

const userLogin = async (req, res, next) => {
    try {
        const userData = await loginAction(req);
        return new CustomResponse(false, userData, SUCCESS_MESSAGES.LOGIN_SUCCESS, res);
    } catch (err) {
        next(err);
    }
}

const forgetPass = async (req, res, next) => {
    try {
        const userData = await forgetAction(req);
        return new CustomResponse(false, userData, SUCCESS_MESSAGES.RESET_LINK, res);
    } catch (err) {
        next(err);
    }
}

const resetPass = async (req, res, next) => {
    try {
        const userData = await resetAction(req);
        return new CustomResponse(false, userData, SUCCESS_MESSAGES.RESET_SUCCESS, res);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    userLogin,
    resetPass,
    forgetPass
};
