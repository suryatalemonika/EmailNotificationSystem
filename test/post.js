const axios = require('axios');

// Define the endpoint URL
const endpoint = 'http://localhost:3000/api/notify';

// Data to send in the request body
const notificationData = {
  userId: "monikasuryatale",        // Replace with actual user ID
  message: "Your task is due soon!", // Replace with the actual message
  type: "reminder",       // Replace with the type of notification
  priority: "high",       // Priority: e.g., 'high', 'medium', or 'low'
  send_time: "2025-01-19T15:30:00Z" // Optional: Scheduled send time (ISO format)
};

// Make the POST request
axios.post(endpoint, notificationData)
  .then((response) => {
    console.log('Response:', response.data);
  })
  .catch((error) => {
    if (error.response) {
      console.error('Error Response:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  });
