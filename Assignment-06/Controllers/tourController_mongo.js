const Tour = require('../models/tourModel.js');
const AppError = require('../utils/appError.js');
const APIFeatures = require('./../utils/apiFeatures.js');
const catchAsync = require('./../utils/catchAsync.js');
const Factory = require('./handlerFactory.js');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid URL',
    });
  }
  next();
};

// exports.getAllTours = catchAsync(async (req, res, next) => {
  // const features = new APIFeatures(Tour.find(), req.query)
  //   .filter()
  //   .sort()
  //   .fields()
  //   .paginate();
  // const tours = await features.query;

  // res.status(200).json({
  //   status: 'success',
  //   toursLength: tours.length,
  //   data: {
  //     tours,
  //   },
  // });
// });

exports.getAllTours = Factory.getAll(Tour);

exports.getOneTour = Factory.getOne(Tour, { path: 'reviews' });

exports.createTour = Factory.createOne(Tour);

exports.updateTour = Factory.updateOne(Tour);

exports.deleteTour = Factory.deleteOne(Tour);

// We can use one operator multiple times like using match multiple times
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 3.5 } },
    },
    {
      $group: {
        _id: '$ratingsAverage',
        numRatings: { $sum: '$ratingsQuantity' },
        avgratings: { $avg: '$ratingsAverage' },
        avgprice: { $avg: '$price' },
        maxprice: { $max: '$price' },
        minprice: { $min: '$price' },
      },
    },
    {
      $sort: { avgprice: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    body: {
      stats,
    },
  });
});

exports.monthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: {
        month: '$_id',
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    body: {
      plan,
    },
  });
});


// /tours-within/:distance/center/:latlng/unit/:unit
// /tours-within/233/center/34.111745,-118.113491/unit/mi
exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours
    }
  });
});
