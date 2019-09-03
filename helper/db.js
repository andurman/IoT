const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = () => {
    mongoose.connect('mongodb://localhost/iot')
        .then(() =>  console.log('MongoDB connection succesful'))
        .catch((err) => console.error(err));
};