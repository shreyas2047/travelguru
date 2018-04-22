var blogCtrl = require("./blogCtrl");

function blogRoute(app) {

    app.post("/blog", blogCtrl.post, blogCtrl.get);
    app.post("/updateBlog",blogCtrl.update);
    app.get("/blog", blogCtrl.get);
    app.get("/blog-create", blogCtrl.create);
}

module.exports = blogRoute;