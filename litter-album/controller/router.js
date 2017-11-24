var file = require("../models/file");
var formidable = require('formidable');
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");
//首页
exports.showIndex = function (req, res, next) {
    /*res.render("index",{
        "albums":file.getAllAlbums()
    });*/

    //node.js所有的东西都是异步的，内层函数需要高层函数提供回调才能执行
    //把数据当作回调函数的参数来使用
    file.getAllAlbums(function (err, alAlbums) {
        if (err) {
            /*res.render("err");*/
            //next();/交给下面的中间件
            return;
        }
        res.render("index", {
            "albums": alAlbums
        })
    })

}
//相册页
exports.showAlbum = function (req, res, next) {
    //遍历相册中的所有图片
    var albumname = req.params.albumName;
    //具体业务交给models
    file.getAllImagesByAlbumName(albumname, function (err, imagesArry) {
        if (err) {
            /*res.render("err");*/
            next(); //交给下面的中间件
            return;
        }
        res.render("album", {
            "albumname": albumname,
            "images": imagesArry
        })
    })
    //res.send("相册"+req.params.albumName);
};
//上传页
exports.showUp = function (req, res) {
    //命令file模块调用函数
    //得到所有文件夹名字后调用我们做的事，写在回调函数里面
    file.getAllAlbums(function (err, albums) {
        res.render("up", {
            "albums": albums
        })
    })


};
//上传表单
exports.doPost = function (req, res, next) {

    var form = new formidable.IncomingForm();


    //修改上传文件的路径
    form.uploadDir = path.normalize(__dirname + "/../uploads/");

    form.parse(req, function (err, fields, files) {
        console.log(files);
        console.log(fields);
        if (err) {
            next(); //交给下面的中间件
            return;
        }
        //判断文件尺寸
        var size = parseInt(files.tupian.size);
        if(size > 5000){
            res.send("图片尺寸应该小于5M");
            //删除图片
            fs.unlink(files.tupian.path);
            return;
        }

        //时间戳
        var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.tupian.name);

        //改文件名
        var wenjianjia = fields.wenjianjia;
        var oldpath = files.tupian.path;
        var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + ttt + ran + extname);

        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                res.send("改名失败");
                return;
            }
            res.send("成功");
        })
    });

    return;
};