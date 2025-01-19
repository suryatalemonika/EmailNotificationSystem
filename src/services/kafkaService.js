const kafka = require("kafka-node");
const config = require("../config/config");

const kafkaClient = new kafka.KafkaClient({ kafkaHost: config.kafkaBroker });
const producer = new kafka.Producer(kafkaClient);

const ensureTopicExists = (topic, callback) => {
    const admin = new kafka.Admin(kafkaClient);
    admin.listTopics((err, res) => {
        if (err) return callback(err);

        const existingTopics = Object.keys(res[1].metadata);
        if (!existingTopics.includes(topic)) {
            admin.createTopics(
                [
                    {
                        topic: topic,
                        partitions: 1,
                        replicationFactor: 1,
                    },
                ],
                (err, result) => {
                    if (err) return callback(err);
                    console.log(`Topic "${topic}" created successfully`);
                    callback(null, result);
                }
            );
        } else {
            console.log(`Topic "${topic}" already exists`);
            callback(null, res);
        }
    });
};

ensureTopicExists("notifications", (err) => {
    if (err) {
        console.error("Failed to ensure topic existence:", err);
        return;
    }

    console.log("Kafka topic setup complete");
});

const consumer = new kafka.Consumer(
    kafkaClient,
    [{ topic: "notifications" }],
    { autoCommit: true }
);

producer.on("ready", () => {
    console.log("Kafka Producer is ready");
});

producer.on("error", (err) => {
    console.error("Kafka Producer Error:", err);
});

consumer.on("message", (message) => {
    console.log("Kafka Consumer received message:", message);
});

consumer.on("error", (err) => {
    console.error("Kafka Consumer Error:", err);
});

process.on("SIGINT", () => {
    consumer.close(true, () => {
        console.log("Kafka Consumer closed");
        kafkaClient.close(() => {
            console.log("Kafka Client closed");
            process.exit(0);
        });
    });
});

module.exports = { producer, consumer };
