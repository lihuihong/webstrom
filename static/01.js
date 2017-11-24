var express = require("express");

var app = express();
app.use(express.static("./"));
app.get("/haha",function (req, res) {
    res.send("hahahhah");
});
app.listen(3000);

