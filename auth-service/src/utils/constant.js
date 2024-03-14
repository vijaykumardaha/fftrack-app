const {HOST, PORT} = require('../config');
module.exports.SUCCESS_MESSAGES = {
    NO_MESSAGE: 'Ok',
    LOGIN_SUCCESS: 'Login Success',
    RESET_LINK: 'Kindly check your email for reset password.',
    RESET_SUCCESS: 'Your password has been successfully changed.',
};

module.exports.ERROR_MESSAGES = {
  INVALID_PASSWORD: 'Invalid password',
  INVALID_EMAIL: 'Invalid email Id',
  INVALID_RESET_TOKEN: 'Opps! Password reset token has been expired. Please try again!',
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
        title: "Auth API",
        version: "1.0.0",
        description:
          "Auth api with express and documented with swagger",
      },
      servers: [
        {
          url: `http://${HOST}:${PORT}`,
        },
      ],
    },
    apis: ["./src/routes/*.js"],
  };

