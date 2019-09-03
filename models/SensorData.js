const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SensorDataSchema = new Schema({
    deviceId: {
        type: String,
        required: true
    },
    deviceOwnerUsername: {
        type: String,
        required: true
    },
    sensorName: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('SensorData', SensorDataSchema);