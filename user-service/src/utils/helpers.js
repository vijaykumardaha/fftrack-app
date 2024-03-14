const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../config');

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

module.exports.BuildQuery = (req, findQuery, limitQuery, sortQuery) => {
    const skipedKeys = ['active', 'direction', 'pageIndex', 'pageLimit', 'searchFields'];
    for (var k in req.query) {
        if (req.query.hasOwnProperty(k)
            && req.query[k] !== null
            && skipedKeys.indexOf(k) === -1
            && Array.isArray(findQuery['$and'])) {
            if (k == 'searchKey') {
                const orQuery = { $or: [] };
                const fieldsArray = req.query.searchFields.split(',');
                fieldsArray.forEach(element => {
                    orQuery['$or'].push({ [element]: { "$regex": `^${req.query[k]}`, "$options": "i" } });
                });
                findQuery['$and'].push(orQuery);
            } else if (k !== '' && k !== null && k !== 'undefined') {
                if (typeof req.query[k] === 'string') {
                    const isArrayField = req.query[k].split(',');
                    if (isArrayField.length > 1) {
                        findQuery['$and'].push({ [k]: { $in: isArrayField } });
                    } else {
                        findQuery['$and'].push({ [k]: req.query[k] });
                    }
                } else {
                    findQuery['$and'].push({ [k]: req.query[k] });
                }
            }
        }
    }
    // page limit query
    if (req.query.pageLimit) {
        const pageIndex = req.query.pageIndex ? req.query.pageIndex : 0;
        limitQuery = { skip: (Number(req.query.pageLimit) * pageIndex), limit: Number(req.query.pageLimit) };
    }
    // sort record keys
    if (req.query.active && req.query.direction) {
        sortQuery = { [req.query.active]: req.query.direction === 'asc' ? 1 : -1 };
    } else {
        sortQuery = { 'createdAt': -1 };
    }
    return { query: findQuery, limit: limitQuery, sort: sortQuery };
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

function pureObject(objectData, recurse) {
    for (var i in objectData) {
        if (objectData[i] === null || objectData[i] === '') {
            delete objectData[i];
        } else if (recurse && typeof objectData[i] === 'object') {
            pureObject(objectData[i], recurse);
        }
    }
    return objectData;
}

module.exports.pureObject = pureObject;
