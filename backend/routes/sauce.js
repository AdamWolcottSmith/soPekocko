const express = require('express');
const router = express.Router();

const Sauce = require('./models/sauce');

//POST SAUCE

router.post('/', (req, res, next) => {
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

//GET ONE SAUCE

router.get('/:id', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
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

//GET ALL SAUCE

router.get('/' + '', (req, res, next) => {
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

module.exports = router;