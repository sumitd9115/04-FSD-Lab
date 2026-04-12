const fs = require('fs');

const Users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getallUsers = (req, res) => {
  res.status(200).json({
    status: 'Success',
    Users: Users,
  });
};
