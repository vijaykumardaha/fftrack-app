const { createAction } = require("../services/auth-service");
const { KAFKA_TOPICS } = require("../utils/constant");
const { GenerateSalt, GeneratePassword } = require("../utils/helpers");
const { KAFKA_CLIENT } = require("./kafka-client");

module.exports.kafkaConsumer = async () => {
  const consumer = KAFKA_CLIENT.consumer({ groupId: 'auth-group' });
  await consumer.connect();

  await consumer.subscribe({ topics: [KAFKA_TOPICS.AUTH_ACTION], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      const randomPassword = Math.floor(100000 + Math.random() * 900000);
        const userData = JSON.parse(message.value.toString());
        const salt = await GenerateSalt();
        const hashPassword = await GeneratePassword(randomPassword.toString(), salt);
        await createAction({ username: userData.username, password: hashPassword, salt });
        console.log('**********', topic, message.value.toString());
        console.log('password', randomPassword);
    },
  });
}
