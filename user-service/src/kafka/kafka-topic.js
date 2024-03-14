const { KAFKA_TOPICS } = require("../utils/constant");
const { KAFKA_CLIENT } = require("./kafka-client");

module.exports.createUserTopic = async () => {
  const admin = KAFKA_CLIENT.admin();
  admin.connect();
  await admin.createTopics({
    validateOnly: false,
    topics: [
      {
        topic: KAFKA_TOPICS.AUTH_ACTION,
        numPartitions: 1
      },
    ],
  });

  await admin.disconnect();
}
