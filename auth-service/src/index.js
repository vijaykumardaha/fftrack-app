const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require("swagger-jsdoc");

const userRouter = require("./routes/auth-route");
const { PORT, DB_URL } = require('./config');
const { RequestLogging, ErrorLogging, ErrorHandler } = require('./utils/handlers');
const { SWAGGER_OPTION } = require('./utils/constant');
const { kafkaConsumer } = require('./kafka/kafka-consumer');

const server = express();

// Configure Server
server.use(express.json({ limit: '1mb'}));
server.use(express.urlencoded({ extended: true, limit: '1mb'}));
server.use(cors('*'));
server.use(express.static(__dirname + '/public'))

// Mongoose Connection
mongoose.set("strictQuery", false);
mongoose.connect(DB_URL, async (err) => {
    if (err) {
        ErrorLogging(err);
    }
});

// Swagger documentation
const specs = swaggerJsdoc(SWAGGER_OPTION);
server.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );

// Logging Request
server.use((req, _res, next) => {
    RequestLogging(req);
    next();
});

// User routing
server.use('/', userRouter)

// kafka subscribe
kafkaConsumer();

// Unhandled Event Listeners
server.use(ErrorHandler);

// Server Listening
server.listen(PORT, () => {
    console.log(`listening user service to port ${PORT}`);
});
