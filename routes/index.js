const express = require('express');
const router = express.Router();
const auth = require("../controllers/AuthController.js");
const UserDevices = require('../models/UserDevices');
const url = require('url');
const socketApi = require('../helper/socketApi');
const MongoClient = require('mongodb').MongoClient;
const url2 = "mongodb://localhost:27017/";

const mqtt = require('mqtt');


/* GET home page. */
router.get('/', function(req, res, next) {
  user = req.user;
  if(!user)
    res.redirect('/login');
  if(user)
  {
    const promise = UserDevices.find({ user_id: user._id });
    promise.then((data) => {
      res.render('index', { devices: data, name: user.firstName+" "+user.lastName});
    });
  }
});

router.get('/detail/*', function (req, res, next) {
  user = req.user;
  if(!user)
    res.redirect('/login');
  if(user)
  {
    const id= user._id;
    const url = req.url;
    const spUrl = url.split('/');
    const devInfo = spUrl[2].split('-');
    const devSocket = "/"+devInfo[0];
    const devSensor = devInfo[1];
    const promise2 = UserDevices.find({ user_id: id, devicesocket: devSocket, devicesensor: devSensor });
    promise2.then((data) => {
      const io = socketApi.io;
      const client  = mqtt.connect({host:'localhost',port:'1883',username:data[0].user_id,password:data[0].deviceSecret});
      const science = io.of(data[0].devicesocket);
      science.on('connection', function (socket) {
        console.log('A user connected to fen socket');
        socket.on('disconnect', function () {
          console.log('A user disconnected to fen socket');
          client.end();
        });
      });

      const sensor = devInfo[0]+"-"+devInfo[1];
      const broker = data[0]._id.toString();
      client.on('connect', function () {
        client.subscribe(broker);
      });

      client.on('message', function (topic, message) {
        context = message.toString();
        console.log(context);
        science.emit(sensor,context);
      });
      MongoClient.connect(url2, function(err, db) {
        if (err) throw err;
        var dbo = db.db("iot");
        var mysort = { _id : -1 };
        dbo.collection(data[0].deviceDB).find().sort(mysort).limit(10).toArray(function(err, result) {
          if (err) throw err;
          db.close();
          const result2 = result.reverse();
          console.log(result2);
          res.render('detail', {
            info: JSON.stringify(data),
            name: user.firstName+" "+user.lastName,
            values: JSON.stringify(result),
            deger: result2,
          });
        });
      });

    });
  }
});

// restrict index for logged in user only
router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

module.exports = router;

/*index tabloları
for element in devices
    .col-lg-6
    .card.card-chart
    .card-header
    h5.card-category= element.devicearea
h4.card-title= element.devicename
    .dropdown
button.btn.btn-round.btn-default.dropdown-toggle.btn-simple.btn-icon.no-caret(type='button', data-toggle='dropdown')
i.now-ui-icons.loader_gear
    .dropdown-menu.dropdown-menu-right
a.dropdown-item(href='/detail'+element.devicesocket + "-" + element.devicesensor) Şimdi İZLE!
.card-body
    .chart-area
div(id= element._id)

    .card-footer
    .stats
i.now-ui-icons.ui-2_time-alarm
|  Son 7 Gün
script.
    function newChart() {
  var chart = new CanvasJS.Chart("#{element._id}", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Son 7 Gün"
    },
    axisY: {
      includeZero: false
    },
    data: [{
      type: "line",
      dataPoints: [
        {y: #{element.lastdays[6].value}, label: "7 Gün Önce"},
        {y: #{element.lastdays[5].value}, label: "6 Gün Önce"},
        {y: #{element.lastdays[4].value}, label: "5 Gün Önce"},
        {y: #{element.lastdays[3].value}, label: "4 Gün Önce"},
        {y: #{element.lastdays[2].value}, label: "3 Gün Önce"},
        {y: #{element.lastdays[1].value}, label: "2 Gün Önce"},
        {y: #{element.lastdays[0].value}, label: "Dün"}
      ]
    }]
  });
  chart.render();
}
window.addEventListener("load", newChart, false);*/
