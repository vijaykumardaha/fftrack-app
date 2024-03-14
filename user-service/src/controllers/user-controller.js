const { createAction, getAction } = require("../services/user-service");
const { CustomResponse } = require('../utils/handlers');
const { SUCCESS_MESSAGES } = require('../utils/constant');

const getUsers = async (req, res, next) => {
    try {
        let { data, totals } = await getAction(req);
        return new CustomResponse(false, data, SUCCESS_MESSAGES.NO_MESSAGE, res, totals);
    } catch (err) {
        next(err);
    }
}

const createUser = async (req, res, next) => {
    try {
        let user = await createAction(req);
        return new CustomResponse(false, user, SUCCESS_MESSAGES.REGISTER_SUCCESS, res);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createUser,
    getUsers,
};
