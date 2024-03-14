const { Kafka } = require("kafkajs");

module.exports.KAFKA_CLIENT = new Kafka({
  clientId: "user-client",
  brokers: [`kafka-service:9092`],
  requestTimeout: 300000,
  retry: {
    initialRetryTime: 100000,
    retries: 20
  }
});
