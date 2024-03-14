const {HOST, PORT} = require('../config');
module.exports.SUCCESS_MESSAGES = {
    NO_MESSAGE: 'Ok',
    REGISTER_SUCCESS: 'Your have successfully registered.',
};

module.exports.ERROR_MESSAGES = {
    USER_ALREADY_EXITS: 'Email already used with other user.',
    INVALID_TOKEN: 'Invalid request token'
};

module.exports.STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};

module.exports.KAFKA_TOPICS = {
  AUTH_ACTION: 'auth-action'
};

module.exports.KAFKA_ACTION_KEYS = {
  CREATE_USER: 'create-user'
};

module.exports.SWAGGER_OPTION = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "User API",
        version: "1.0.0",
        description:
          "User api with express and documented with swagger",
      },
      servers: [
        {
          // url: `http://${HOST}:${PORT}`,
          url: `http://localhost.com/user/`,
        },
      ],
    },
    apis: ["./src/routes/*.js"],
  };

