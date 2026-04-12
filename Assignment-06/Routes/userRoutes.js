const express = require('express');
const userController = require('../Controllers/userController_mongo.js');
const authController = require('../Controllers/authController.js');
const userRouter = express.Router();

userRouter.post('/signUp', authController.signUp);
userRouter.post('/login', authController.login);
userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

// Here, all routes which are defined next to this middleware gets protected.
userRouter.use(authController.protect);

userRouter.patch('/updatePassword', authController.updatePassword);
userRouter.patch('/updateMe', userController.updateMe);
userRouter.delete('/deleteMe', userController.deleteMe);
userRouter.get('/me', userController.getMe);

// All user activities can only be done by Admin
userRouter.use(authController.restrictTo('admin'));

userRouter.route('/').get(userController.getallusers);
userRouter
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = userRouter;
