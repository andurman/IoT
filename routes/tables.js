const express = require('express');
const router = express.Router();
const UserDevices = require('../models/UserDevices');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET users listing. */
router.get('/', function(req, res, next) {
    user = req.user;
    if(!user)
        res.redirect('/login');
    if(user)
    {
        const promise = UserDevices.find({ user_id: user._id });
        promise.then((data) => {
            res.render('tables', { name: user.firstName+" "+user.lastName, tableContent: data});
        });
    }
});

router.post('/cihazkayit', function (req, res, next) {
   const userId = user._id;
   const deviceSecret = userId + Date.now().toString();
   const deviceArea = req.body.devicearea;
   const deviceName = req.body.devicename;
   const deviceSocket = "/" + userId.toString().substring(0,5) + Date.now().toString();
   const deviceSensor = userId.toString().substring(6,10) + Date.now().toString();
   const lastDays = [
       {"day":"1 day ago","value":"0"},
       {"day":"2 day ago","value":"0"},
       {"day":"3 day ago","value":"0"},
       {"day":"4 day ago","value":"0"},
       {"day":"5 day ago","value":"0"},
       {"day":"6 day ago","value":"0"},
       {"day":"7 day ago","value":"0"}
   ];
   const deviceDB = "customerDevice" + userId.toString().substring(0,6) + Date.now().toString();

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("iot");
        dbo.createCollection(deviceDB, function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });

    const newdevice = new UserDevices({
        user_id: userId,
        deviceSecret: deviceSecret,
        devicearea: deviceArea,
        devicename: deviceName,
        devicesocket: deviceSocket,
        devicesensor: deviceSensor,
        lastdays: lastDays,
        deviceDB: deviceDB
    });
    newdevice.save((err,data) => {
        if (err)
            console.log(err);
        else
            console.log("Kayıt Eklendi");
        res.redirect('/tables');
    })
});

router.post('/delete', function (req, res, next) {
    const deleteID = req.body.vera;

    const promise = UserDevices.find({ _id: deleteID });
    promise.then((data) => {
        const deleteDB = data[0].deviceDB;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("iot");
            dbo.collection(deleteDB).drop(function(err, delOK) {
                if (err) throw err;
                if (delOK) console.log("Collection deleted");
                db.close();
            });
        });
        UserDevices.findOneAndRemove({ _id: deleteID }, (err, data) => {
           if(err)
               console.log(err)
        });

        res.redirect('/tables');
    });
});

module.exports = router;