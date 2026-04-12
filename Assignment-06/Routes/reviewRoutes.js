const express = require('express');
const reviewController = require('../Controllers/reviewController.js');
const authController = require('../Controllers/authController.js');
const reviewRouter = express.Router({ mergeParams: true });

// we have use: { mergeParams: true }
// Because, instead of using 2 different routes:
// - POST tours/:tourId/review
// - POST /reviews
// Merge params allows us to make this work with one route only.
// As, first route to be implemented in tours, we just imported reviewRouter in tourRoutes.js and Work done!!

reviewRouter.use(authController.protect);

reviewRouter
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

reviewRouter
  .route('/:id')
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  )
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .get(reviewController.getReview);

module.exports = reviewRouter;
