const Sauce = require('../models/sauce');

exports.createThing = (req, res, next) => {
 console.log(req);
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
    message: 'Post saved successfully!'
   });
  }
 ).catch(
  (error) => {
   res.status(400).json({
    error: error
   });
  }
 );
};

exports.getOneThing = (req, res, next) => {
 Sauce.findOne({
  _id: req.params.id
 }).then(
  (sauce) => {
   res.status(200).json(sauce);
  }
 ).catch(
  (error) => {
   res.status(404).json({
    error: error
   });
  }
 );
};

exports.modifyThing = (req, res, next) => {
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
};

exports.deleteThing = (req, res, next) => {
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
};

exports.getAllStuff = (req, res, next) => {
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
};