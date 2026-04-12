const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel.js');
const User = require('../../models/userModel.js');
const Review = require('../../models/reviewModel.js');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE;

mongoose.connect(DB).then((con) => {
  console.log('DB Connection Successful');
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data Added successfully!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data deleted Successfully!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
