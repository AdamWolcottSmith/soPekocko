const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Sauce = require('./models/sauce');

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

//POST SAUCE

app.post('/api/sauces', (req, res, next) => {
 const sauce = new Sauce({
  userId: req.body.userId,
  name: req.body.name,
  manufacturer: req.body.manufacturer,
  description: req.body.description,
  mainPepper: req.body.mainPepper,
  imageUrl: req.body.imageUrl,
  heat: req.body.heat,
  likes: req.body.likes,
  dislikes: req.body.dislikes,
  usersLiked: req.body.usersLiked,
  usersDisliked: req.body.usersDisliked,
 });
 sauce.save().then(
  () => {
   res.status(201).json({
    message: 'Successfully posted a sauce'
   });
  }
 ).catch(
  (error) => {
   res.status(400).json({
    error: error
   });
  }
 );
});

//GET ALL SAUCE

app.get('/api/sauces', (req, res, next) => {
 Sauce.find().then(
  (sauces) => {
   res.status(200).json(sauces);
  }
 ).catch(
  (error) => {
   res.status(400).json({
    error: error
   });
  }
 );
});

//GET ONE SAUCE

app.get('/api/sauces/:id', (req, res, next) => {
 Sauces.findOne({
  _id: req.params.id
 }).then(
  (sauces) => {
   res.status(200).json(sauces);
  }
 ).catch(
  (error) => {
   res.status(404).json({
    error: error
   });
  }
 );
});

//MODIFY SAUCE

app.put('/api/sauces/:id', (req, res, next) => {
 const sauce = new Sauce({
  _id: req.params.id,
  name: req.body.name,
  manufacturer: req.body.manufacturer,
  description: req.body.description,
  mainPepper: req.body.mainPepper,
  imageUrl: req.body.imageUrl,
  heat: req.body.heat,
  likes: req.body.likes,
  dislikes: req.body.dislikes,
  usersLiked: req.body.usersLiked,
  usersDisliked: req.body.usersDisliked,
 });
 Sauce.updateOne({ _id: req.params.id }, sauce).then(
  () => {
   res.status(201).json({
    message: 'Sauce updated successfully!'
   });
  }
 ).catch(
  (error) => {
   res.status(400).json({
    error: error
   });
  }
 );
});

//DELETE A SAUCE

app.delete('/api/sauces/:id', (req, res, next) => {
 Sauce.deleteOne({ _id: req.params.id }).then(
  () => {
   res.status(200).json({
    message: 'Deleted!'
   });
  }
 ).catch(
  (error) => {
   res.status(400).json({
    error: error
   });
  }
 );
});

module.exports = app;