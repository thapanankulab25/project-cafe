const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const User = require('../models/User.js');

router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            next(err);
        });
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      next(err);
    });
});

//with web
router.get('/delete/:id', (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(deletedemployee => {
      res.redirect('/employee')
    })
    .catch(err => {
      next(err);
    });
});

router.post('/updateU/:id', async (req, res, next) => {
  const userId = req.params.userId;

  try {
    // Assuming you have a User model with appropriate schema
    const updatedUser = await User.findByIdAndUpdate(userId, {
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      role: req.body.role,
      image: req.file.filename, // Assuming you are using multer for file uploads
    }, { new: true });

    // Check if the user was found and updated successfully
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});


// router.post('/insert', (req, res, next) => { //Create products
//   User.create(req.body)
//     .then(users => {
//       res.redirect('/employee')
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// Multer configuration
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/users'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});
const upload = multer({ storage: storage });
router.post('/insert', upload.single('image'), async (req, res, next) => {
  try {
    console.log('Received form data:', req.body);
    console.log('Received file:', req.file);

    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      role: req.body.role,
      image: req.file.filename,
    });

    res.redirect('/employee');
  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
});






module.exports = router;
