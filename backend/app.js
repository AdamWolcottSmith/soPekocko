const express = require('express');

const app = express();

//CORS

app.use((req, res, next) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
 next();
});

//MIDDLEWARE

app.use((req, res, next) => {
 console.log('Request received!');
 next();
});

app.use((req, res, next) => {
 res.status(201);
 next();
});

app.use((req, res, next) => {
 res.json({ message: 'Your request freaking ruled!' });
 next();
});

app.use((req, res, next) => {
 console.log('Response sent successfully!');
});

module.exports = app;