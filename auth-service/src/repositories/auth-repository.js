const AuthModel = require('../models/auth-model');
const { CustomError } = require('../utils/handlers');
const { STATUS_CODES } = require('../utils/constant');

//Dealing with data base operations
const getOne = async (query) => {
    try {
        const userData = await AuthModel.findOne(query).lean();
        return userData;
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
};

const getAll = async (findQuery = {}, limitQuery = {}, sortQuery = {}) => {
    try {
        return await AuthModel.find(findQuery, null, limitQuery).sort(sortQuery);
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
};

const save = async (userData) => {
    try {
        const user = new AuthModel(userData)
        const customerResult = await user.save();
        return customerResult.toJSON();
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
};

const remove = async (matchCondition) => {
    try {
        await AuthModel.deleteMany(matchCondition);
        return {};
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
};

const update = async (updateQuery, matchCondition) => {
    try {
        await AuthModel.updateOne(matchCondition, { $set: updateQuery }, { upsert: true });
        const updatedData = await getOne(matchCondition);
        return updatedData;
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
};

const updateMany = async (updateQuery, matchCondition) => {
    try {
        await AuthModel.updateMany(matchCondition, { $set: updateQuery });
        const updatedData = await getOne(matchCondition);
        return updatedData;
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
};

const count = async (query) => {
    try {
        const getCount = await AuthModel.count(query);
        return getCount;
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
};

module.exports = {
    getOne,
    getAll,
    save,
    remove,
    update,
    updateMany,
    count
};
