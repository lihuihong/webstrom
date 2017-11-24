var fs = require("fs");

//异步导致
//里面callback回调包括了err和文件夹的名字
exports.getAllAlbums = function (callback) {
    fs.readdir("./uploads", function (err, files) {
        if(err){
            callback("没有uploads文件夹",null);
            return;
        }
        //声明一个数组
        var allAlbums = [];
        //迭代器
        (function iterator(i) {
            if (i == files.length) {
                //遍历文件夹结束
                console.log(allAlbums);
                /*return allAlbums;*/
                callback(null,allAlbums);
                return;
            } else {
                fs.stat("./uploads/" + files[i], function (err, stats) {
                    if (err){
                        callback("找不到文件" + files[i],null);
                        return;
                    }
                    if (stats.isDirectory()) {
                        allAlbums.push(files[i]);
                    }
                    iterator(i + 1);
                })

            }

        })(0);
    })
};
exports.getAllImagesByAlbumName = function (albumName, callback) {
    fs.readdir("./uploads/" + albumName, function (err, files) {
        if(err){
            callback("没有uploads文件夹",null);
            return;
        }
        //声明一个数组
        var allImages = [];
        //迭代器
        (function iterator(i) {
            if (i == files.length) {
                //遍历文件夹结束
                console.log("回调完成文件夹："+allImages);
                console.log("回调完成文件："+albumName);
                /*return allAlbums;*/
                callback(null,allImages);
                return;
            } else {
                fs.stat("./uploads/"+ albumName +"/"+ files[i], function (err, stats) {
                    if (err){
                        callback("找不到文件" + files[i],null);
                        return;
                    }
                    if (stats.isFile()) {
                        allImages.push(files[i]);
                    }
                    iterator(i + 1);
                })

            }

        })(0);
    })
};