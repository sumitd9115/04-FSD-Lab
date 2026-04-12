const mongoose = require('mongoose');
const validator = require('validator');
const { validate } = require('./tourModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { forgotPassword } = require('../Controllers/authController');
const { type } = require('os');
const { ref } = require('process');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required!!'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide valid email'],
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guide', 'lead-guide'],
    default: 'user',
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password is required!!'],
    trim: true,
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm Password is required!!'],
    trim: true,
    validate: {
      // THIS WILL ONLY WORKS ON .create() and .save()
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not same!!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified.
  if (!this.isModified('password')) return next();

  // Hashing password at the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete Password Confirm Field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// QUERY MIDDLEWARE
userSchema.pre(/^find/, function (next) {
  // It get active whenever "find" keyword is used.
  this.find({ active: true });
  next();
});

userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // console.log(changedTimestamp, JWTTimestamp);
    return changedTimestamp > JWTTimestamp;
  }
  return false;
};

userSchema.methods.createPassResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  // Duration will be of 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
