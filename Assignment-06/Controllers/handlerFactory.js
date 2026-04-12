const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');
const APIFeatures = require('../utils/apiFeatures.js');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with this Id!!', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!newDoc) {
      return next(new AppError('No document found with this Id', 404));
    }

    res.status(201).json({
      success: true,  
      data: newDoc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) {
      return next(
        new AppError('Please provide all fields to create a document!!', 404)
      );
    }

    res.status(200).json({
      success: true,
      data: doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // This 'if' loop is for getting logged in user
    if (req.user) req.params.id = req.user.id;

    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No Document found with this Id', 404));
    }

    res.status(200).json({
      success: true,
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .fields()
      .paginate();

    const doc = await features.query;

    // .explain(): gives all information about the result we are getting from API
    // const doc = await features.query.explain();

    res.status(200).json({
      status: 'success',
      docLength: doc.length,
      data: {
        doc,
      },
    });
  });
