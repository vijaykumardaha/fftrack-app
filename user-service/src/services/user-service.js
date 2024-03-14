const { getOne, getAll, save, count } = require("../repositories/user-repository");
const { CustomError } = require('../utils/handlers');
const { STATUS_CODES, ERROR_MESSAGES, KAFKA_TOPICS, KAFKA_ACTION_KEYS } = require('../utils/constant');
const { kafkaProducer } = require("../kafka/kafka-producer");

const createAction = async (req) => {
    try {
        const existingUser = await getOne({ email: req.body.email });
        if (existingUser) {
            throw new CustomError(true, [], ERROR_MESSAGES.USER_ALREADY_EXITS, STATUS_CODES.BAD_REQUEST);
        }

        await kafkaProducer(KAFKA_TOPICS.AUTH_ACTION, [{
            key: KAFKA_ACTION_KEYS.CREATE_USER,
            value: JSON.stringify({ username: req.body.email }),
        }]);
        
        return await save(req.body);
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
}

const getAction = async (req) => {
    try {
        const data = await getAll({});
        const totals = await count({});
        return { data, totals };
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
}

module.exports = {
    createAction,
    getAction,
};

