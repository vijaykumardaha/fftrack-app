const UserModel = require('../models/user-model');
const { CustomError } = require('../utils/handlers');
const { STATUS_CODES } = require('../utils/constant');

//Dealing with data base operations
const getOne = async (query) => {
    try {
        const userData = await UserModel.findOne(query).lean();
        return userData;
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
};

const getAll = async (findQuery = {}, limitQuery = {}, sortQuery = {}) => {
    try {
        return await UserModel.find(findQuery, null, limitQuery).sort(sortQuery);
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
};

const save = async (userData) => {
    try {
        const user = new UserModel(userData)
        const customerResult = await user.save();
        return customerResult.toJSON();
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
};

const remove = async (matchCondition) => {
    try {
        await UserModel.deleteMany(matchCondition);
        return {};
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
};

const update = async (updateQuery, matchCondition) => {
    try {
        await UserModel.updateOne(matchCondition, { $set: updateQuery }, { upsert: true });
        const updatedData = await getOne(matchCondition);
        return updatedData;
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
};

const updateMany = async (updateQuery, matchCondition) => {
    try {
        await UserModel.updateMany(matchCondition, { $set: updateQuery });
        const updatedData = await getOne(matchCondition);
        return updatedData;
    } catch (err) {
        throw new CustomError(true, [], err.message, STATUS_CODES.INTERNAL_ERROR);
    }
};

const count = async (query) => {
    try {
        const getCount = await UserModel.count(query);
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
