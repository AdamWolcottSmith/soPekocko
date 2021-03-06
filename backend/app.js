const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const app = express();

mongoose.connect('mongodb+srv://hotSaucy:qazQAZ234@cluster0.s9rpb.mongodb.net/Cluster0?retryWrites=true&w=majority').then(() => {
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

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;