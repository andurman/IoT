const express = require('express');
const router = express.Router();
const UserDevices = require('../models/UserDevices');

/* GET users listing. */
router.get('/', function(req, res, next) {
    user = req.user;
    if(!user)
        res.redirect('/login');
    if(user)
    {
        res.render('profile', {
            name: user.firstName+" "+user.lastName,
            companyName: user.companyName,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            adress: user.adress,
            city: user.city,
            country: user.country,
            postalCode: user.postalCode
        });
    }
});

router.get('/kayit', function (req, res, next) {
    UserDevices.findByIdAndUpdate('5c1b845b0fcfe508206a371c',{
            deviceDB: 'customerDevice1'
        },
        (err, data) =>{

        });
    UserDevices.findByIdAndUpdate('5c1b8519c2c6e00ad827b696',{
            deviceDB: 'customerDevice2'
        },
        (err, data) =>{

        });
    UserDevices.findByIdAndUpdate('5c1b85d17efe5b2674069942',{
            deviceDB: 'customerDevice3'
        },
        (err, data) =>{

        });
    UserDevices.findByIdAndUpdate('5c1b863b3d215b021ceef259',{
    deviceDB: 'customerDevice4'
    },
    (err, data) =>{

    });
    UserDevices.findByIdAndUpdate('5c1b86b4174a062a744f0dcd',{
        deviceDB: 'customerDevice5'
      },
      (err, data) =>{

      });
    UserDevices.findByIdAndUpdate('5c1b86b4174a062a744f0dce',{
        deviceDB: 'customerDevice6'
      },
      (err, data) =>{

      });
    UserDevices.findByIdAndUpdate('5c1b87e1b5e137182cf462cc',{
        deviceDB: 'customerDevice7'
      },
      (err, data) =>{

      });
    UserDevices.findByIdAndUpdate('5c1b87e1b5e137182cf462cd',{
        deviceDB: 'customerDevice8'
      },
      (err, data) =>{

      });
    UserDevices.findByIdAndUpdate('5c1b87e1b5e137182cf462ce',{
        deviceDB: 'customerDevice9'
      },
      (err, data) =>{

      });
    UserDevices.findByIdAndUpdate('5c1b881a9158951cc4dbbd62',{
        deviceDB: 'customerDevice10'
      },
      (err, data) =>{

      });
    UserDevices.findByIdAndUpdate('5c1b881b9158951cc4dbbd63',{
        deviceDB: 'customerDevice11'
      },
      (err, data) =>{

      });
    UserDevices.findByIdAndUpdate('5c1b881b9158951cc4dbbd64',{
        deviceDB: 'customerDevice12'
      },
      (err, data) =>{

      });
});

module.exports = router;
