const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createThing = (req, res, next) => {
  req.body.sauce = JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host');
  const sauce = new Sauce({
    userId: req.body.sauce.userId,
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    heat: req.body.sauce.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
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
  let sauce = new Sauce({ _id: req.params._id });
  console.log('sauce', sauce);
  console.log('req', req);

  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
      _id: req.params.id,
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + '/images/' + req.file.filename,
      heat: req.body.sauce.heat,
    };
  } else {
    sauce = {
      _id: req.params.id,
      userId: req.body.userId,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      heat: req.body.heat,
    };
  }
  Sauce.updateOne({ _id: req.params.id }, sauce).then(
    () => {
      console.log('img', sauce.imageUrl)
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
}


exports.likeThing = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(
    (sauce) => {

      let query = {}

      if (req.body.like === 1) {
        query.$push = { usersLiked: req.body.userId }
        query.$pull = { usersDisliked: req.body.userId }
        query.$inc = { likes: 1 }
      } else if (req.body.like === -1) {
        query.$push = { usersDisliked: req.body.userId }
        query.$pull = { usersLiked: req.body.userId }
        query.$inc = { dislikes: 1 }
      } else if (req.body.like === 0 && sauce.usersLiked.some((user) => req.body.userId === user)) {
        query.$inc = { likes: -1 }
        query.$pull = { usersLiked: req.body.userId }
      } else if (req.body.like === 0 && sauce.usersDisliked.some((user) => req.body.userId === user)) {
        query.$inc = { dislikes: -1 }
        query.$pull = { usersDisliked: req.body.userId }
      }

      Sauce.updateOne({ _id: req.params.id }, query).then(
        () => {
          res.status(201).json({
            message: 'Sauce rated!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    }
  )
}

exports.deleteThing = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
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