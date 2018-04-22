var productCtrl = require("./productCtrl.js");

function productRoute(app) {
    app.get("/products", productCtrl.get);
    app.post("/api/search", productCtrl.search)
    app.post("/api/products/create", productCtrl.create);
    app.get("/api/products", productCtrl.getProducts);

    // function isLoggedIn(req, res, next) {
    //     if (req.isAuthenticated())
    //         return next();

    //     res.redirect('/');
    // }

}
module.exports = productRoute;