const { ValidateSignature, BuildQuery } = require('../utils/helpers');
const { CustomError } = require('../utils/handlers');
const { ERROR_MESSAGES, STATUS_CODES } = require('../utils/constant');

module.exports.authentication = async (req, res, next) => {

    const isAuthorized = await ValidateSignature(req);

    if (isAuthorized) {
        return next();
    }

    return new CustomError(true, [], ERROR_MESSAGES.INVALID_TOKEN, STATUS_CODES.UN_AUTHORIZED, res);
}
