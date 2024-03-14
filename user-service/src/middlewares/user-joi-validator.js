const Validators = require('./user-joi-schema');

module.exports = function(validator) {
    return async function(req, _res, next) {
        try {
            await Validators[validator].validateAsync(req.body)
            next()
        } catch (err) {
            next(err);
        }
    }
}