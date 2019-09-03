const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDevicesSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    deviceSecret: {
        type: String,
        unique: true,
        required: true
    },
    devicearea: {
        type: String,
        required: true
    },
    devicename: {
        type: String,
        required: true
    },
    devicesocket: {
        type: String,
        required: true
    },
    devicesensor: {
        type: String,
        required: true
    },
    lastdays: [{day: String, value: String}],
    deviceDB: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('UserDevices', UserDevicesSchema);