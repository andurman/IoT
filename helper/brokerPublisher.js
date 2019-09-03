const mqtt = require('mqtt');
const client  = mqtt.connect({host:'localhost',port:'1883',username:'5c08050b99caa620fcaa5fe9',password:'adminSecret'});
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectID = require('mongodb').ObjectID;



module.exports = () => {
    client.on('connect', () => {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("iot");
            dbo.collection("userdevices").find({}).toArray(function(err, result) {
                if (err) throw err;
                result.forEach((element) => {
                    if(element.user_id!='5c08050b99caa620fcaa5fe9')
                    {
                        let devTopic = element._id.toString();
                        client.subscribe(devTopic);
                    }
                });
                db.close();
            });
        });
    });

    client.on('message', (topic, message) => {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("iot");
            dbo.collection("userdevices").findOne({_id: new ObjectID(topic)}, function(err, result) {
                if (err) throw err;
                addData(result.deviceDB,result._id,result.devicename);
            });
            const addData = (dbname,deviceid,devicename) => {
                var myobj = {
                    deviceId: deviceid,
                    deviceName: devicename,
                    value: message.toString(),
                    date: new Date(Date.now()).toLocaleString()
                };
                dbo.collection(dbname).insertOne(myobj, function(err, res) {
                    if (err) throw err;
                    db.close();
                });
            };
        });
    });
};






