var blogModel = require("mongoose").model("blog");

var blogCtrl = {};
blogCtrl.get = function (req, res) {
    blogModel.find(function (err, data) {
        if (err) {
            res.render("blog", { errorData: "Something went wrong" });
        }
        else {
            console.log(data);
            res.render("blog", { blogs: data, errorData: false, title: "Blog" });
        }
    })

};

blogCtrl.create = function (req, res) {
    res.render("createBlog");
};

blogCtrl.post = function (req, res, next) {
    console.log(req);
    var blog = new blogModel(req.body);
    blog.save(function (err, data) {
        if (err) {
            res.send("Error Occurred");
        }
        else {
            next()
        }
    });



};
blogCtrl.update = function (req, res) {
    //console.log(req.body);
    var id = req.body.id;
    console.log(req.body);
    var comments =[req.body.comment];
    blogModel.findOneAndUpdate({ _id: id },
        { blogContent: req.body.blogContent,
            comments: comments},
        { upsert: true },
        function (err, data) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.json(data);
        });
};

module.exports = blogCtrl;