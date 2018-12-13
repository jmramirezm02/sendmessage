'use strict';
var admin = require('firebase-admin');

var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: "silver-fastness-221913",
    storageBucket: "silver-fastness-221913.appspot.com",
    messagingSenderId: "1097234876782"
};

admin.initializeApp(config);

// This registration token comes from the client FCM SDKs.
var registrationToken = process.env.CLIENT_TOKEN;

// See documentation on defining a message payload.
var message = {
    notification: {
        title: '$GOOG up 1.43% on the day',
        body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
        icon: 'stock_ticker_update',
        color: '#f45342'
    },
    token: registrationToken
};

var topicMessage = {
    android: {
        ttl: 3600 * 1000, // 1 hour in milliseconds
        priority: 'normal',
        notification: {
            title: 'Android prueba 8',
            body: 'Hello world',
            icon: 'stock_ticker_update',
            color: '#f45342'
        }
    },
    topic: 'general'
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(topicMessage)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });