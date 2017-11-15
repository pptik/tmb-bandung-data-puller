let db = require('../app').db;
let tmbTracker = db.collection('tbl_tmb_tracker');
let tmbTrackerHistory = db.collection('tbl_tmb_tracker_history');
let ObjectId = require('mongodb').ObjectID;
let id = require('moment/locale/id');
let dateFormat="YYYY-MM-DD HH:mm:ss";
exports.insertToTMBTrackerHistory= (query)=> {
    return new Promise((resolve, reject)=>{
        let gpstrackerdate=moment(query.gpsdatetime,'id');
        let tmbQuery = {
            buscode:query.buscode,
            koridor:query.koridor,
            course:query.course,
            gpsdatetime:gpstrackerdate.toDate(),
            location:{
                type:"Point",
                coordinates:[parseFloat(query.longitude), parseFloat(query.latitude)]
            },
            created_at:new Date(),
            updated_at:new Date()
        };
        tmbTrackerHistory.insertOne(tmbQuery, function (err, result) {
            if(err)reject(false);
            else resolve(true);
        });
    });
};