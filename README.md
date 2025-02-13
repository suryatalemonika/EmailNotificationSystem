
# Distributed Notification and Alert System (EmailNotificationSystem)

## Description

This project is a **Distributed Notification and Alert System** designed to deliver notifications to users via multiple channels like **email**, **SMS**, and **push notifications**. The system supports **Kafka** for message processing, **MongoDB** for data storage, and integrates basic features like throttling, quiet hours, and prioritization. The system also includes an **analytics endpoint** to gather delivery statistics and user engagement metrics.

### Key Features:
- **Message Delivery:** Notifications are delivered via email, SMS, and push channels.
- **Throttling:** Limits the number of notifications per user per hour.
- **Quiet Hours:** Prevents notifications during the user's defined quiet hours.
- **Kafka:** Used for event-driven message processing.
- **MongoDB:** Stores notification and user preference data.
- **Analytics API:** Provides insights into delivery stats and user engagement.

## Design Choices

### **Message Processing with Kafka**
Kafka is used as the backbone of the system for message queuing and processing. The producer sends notification messages to Kafka, and the consumer processes those messages, ensuring that each notification is delivered according to the user's preferences.

### **User Preferences**
Each user has specific notification preferences that determine the channels through which they want to receive notifications, the quiet hours during which they don't want notifications, and the maximum notifications per hour.

### **Notification Delivery Logic**
The system supports **email**, **SMS**, and **push notifications**, with logic to send notifications based on user preferences. It also supports retry logic, where notifications can be retried in case of failure.

### **Analytics Endpoint**
The `/analytics` endpoint provides key metrics like:
- **Delivery Stats**: Total notifications sent, failed, and retried.
- **User Engagement**: Average delivery time and response rate.

These metrics can help in monitoring the performance of the system and understanding how users interact with notifications.

## Installation

### Prerequisites
1. **MongoDB**: Ensure you have MongoDB installed and running on `localhost:27017`.
2. **Kafka**: Ensure Kafka is set up and running on `localhost:9092`.
3. **Node.js**: Install Node.js from [here](https://nodejs.org/).

### Steps to Run
1. Clone this repository to your local machine:
   ```bash
   git clone [git url](https://github.com/suryatalemonika/EmailNotificationSystem.git).
   cd EmailNotificationSystem/src
   node server.js
   ```
**Make sure all dependencies should be installed before run this project**


~/kafka_2.13-3.9.0/bin/zookeeper-server-start.sh ~/kafka_2.13-3.9.0/config/zookeeper.properties
~/kafka_2.13-3.9.0/bin/kafka-server-start.sh ~/kafka_2.13-3.9.0/config/server.properties

