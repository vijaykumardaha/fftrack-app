const { KAFKA_CLIENT } = require("./kafka-client");


module.exports.kafkaProducer = async (topic, messages) => {
  const producer = KAFKA_CLIENT.producer();
  await producer.connect();
  await producer.send({ topic, messages });
  await producer.disconnect();
}
