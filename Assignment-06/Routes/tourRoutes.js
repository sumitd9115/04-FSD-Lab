const express = require('express');
const tourController = require('../Controllers/tourController_mongo.js');
const authController = require('../Controllers/authController.js');
const reviewRouter = require('../Routes/reviewRoutes.js');
const tourRouter = express.Router();

// IMPLEMENTING NESTED ROUTES
// tourRouter
//   .route('/:tourId/review')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

tourRouter.use('/:tourId/review', reviewRouter);

tourRouter.route('/tour-stats').get(tourController.getTourStats);
tourRouter
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.monthlyPlan
  );

tourRouter
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi
  
tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

tourRouter
  .route('/:id')
  .get(tourController.getOneTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = tourRouter;
