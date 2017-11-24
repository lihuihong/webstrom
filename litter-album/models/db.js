//这个模块里面封装了所有对数据库的操作
var MongoClient = require("mongo").MongoClient;

//不管数据库什么操作，都是先连接数据库，所有我们可以吧数据库封装成函数

function _connectDB(callback) {
    // Connection URL
    var url = 'mongodb://localhost:27017/haha';

    //连接数据库
    MongoClient.connect(url, function (err, db) {
        console.log("连接成功了")
        callback(err,db);
    });
}


//插入数据
exports.insertOne = function (collecionName, json, callback) {
    _connectDB(function (err, db) {
        //表示连接成功之后做的事

        db.collection(collecionName).insertOne(json,function (err, result) {
            callback(err,result);
            db.close();//关闭数据库

        })

    });
}