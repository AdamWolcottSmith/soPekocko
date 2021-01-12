//MONGODB U/N: hotSaucy PASS: qazQAZ234
//MONGODB CONNECTION: mongodb+srv://hotSaucy:<password>@cluster0.s9rpb.mongodb.net/<dbname>?retryWrites=true&w=majority


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://hotSaucy:qazQAZ234@Cluster0.s9rpb.mongodb.net/Cluster0?retryWrites=true&w=majority').then(() => {
 console.log('Successfully connected to MongoDB Atlas');
}).catch((error) => {
 console.log('Unable to connect to MongoDB Atlas');
 console.error(error)
})

//CORS

app.use((req, res, next) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
 next();
});

//GLOBAL

app.use(bodyParser.json());

//MIDDLEWARE

app.post('/api/stuff', (req, res, next) => {
 console.log(req.body);
 res.status(201).json({
  message: 'Thing created successfully!'
 });
});

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