const User = require('../models/userModel.js');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync.js');
const Factory = require('./handlerFactory.js');

const filterObj = (obj, ...allowedfields) => {
  newobj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedfields.includes(el)) newobj[el] = obj[el];
  });
  return newobj;
};

exports.getMe = Factory.getOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. If user fills password and passwordConfirm field, then throw error
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'If you want to update password, Use route /updatePassword!!',
        400
      )
    );
  }

  // 2. Update User Document
  // Filtered out unwanted fields name that are not allowed to be updated
  // Here, I have mentioned just those fields which are allowed to update that are 'name' and 'email'
  const filteredBody = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  // Here, we are just updating active field and setting it to false not deleting user from database.
  // So, we will just be getting only those user's data having active property 'True'.
  // For this purpose, Query middleware is used in 'getalltours' which is defined in 'userModel.js'
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getallusers = Factory.getAll(User);

exports.getUser = Factory.getOne(User);

exports.deleteUser = Factory.deleteOne(User);

exports.updateUser = Factory.updateOne(User);
