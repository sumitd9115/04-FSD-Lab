const Review = require('../models/reviewModel.js');
const catchAsync = require('../utils/catchAsync.js');
const Factory = require('./handlerFactory.js');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = Factory.getAll(Review);

exports.getReview = Factory.getOne(Review);

exports.createReview = Factory.createOne(Review);

exports.deleteReview = Factory.deleteOne(Review);

exports.updateReview = Factory.updateOne(Review);
