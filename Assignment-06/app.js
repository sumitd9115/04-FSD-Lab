const express = require('express');
const tourRouter = require('./Routes/tourRoutes.js');
const userRouter = require('./Routes/userRoutes.js');
const reviewRouter = require('./Routes/reviewRoutes.js');
const globalErrorHandler = require('./Controllers/errorHandlers.js');
const AppError = require('./utils/appError.js');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

const app = express();

// Rate Limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour!',
});
app.use('/api', limiter);

// Body parsers must come first
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Security middlewares
app.use(helmet()); // 1) Helmet (safe)
// app.use(mongoSanitize());   // 2) Prevent NoSQL injection
// app.use(hpp());             // 3) Prevent HTTP param pollution

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Undefined route handler
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
