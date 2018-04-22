var request = require("request");
var config = require("../config/environment/development");
var _ = require("underscore");
var product = require("mongoose").model("product");
var productCtrl = {};
console.log(config);
productCtrl.get = function(req, res) {
    res.send("<h1>Hello Products</h1>");
};

productCtrl.search = function(req, res) {
    var query = "&query=" + req.body.search;
    var url = config.wallMartUrl + query;
    request(url, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var product = JSON.parse(body);
            var data = getFilteredData(product.items);
            res.json({status:"Success",data:data});

        } else {
            res.json(err);
        }
    })

    function getFilteredData(products) {
        var filteredOutput = [];
        //console.log(products);
        _.each(products, function(item) {

            var product = _.pick(item, 'salePrice',
                'shortDescription',
                "thumbnailImage",
                "name");
            filteredOutput.push(product);
        });
        return filteredOutput;
    }
    //res.send(url);
}

productCtrl.create = function(req, res) {
    var productSchema = new product(req.body);
    var result = {
        status: false,
        data: null,
        errorMessage: null
    }
    productSchema.save(function(err, data) {
        if (err) {
            result.errorMessage = "Error Occured";
            res.json(result);
        } else {
            result.status = "Success";
            result.data = null;
            res.json(result);
        }
    })
};

productCtrl.getProducts = function(req, res) {
    var result = {
        status: false,
        data: null,
        errorMessage: null
    };

    product.find({}, function(err, data) {
        if (err) {
            result.errorMessage = "Error Occured";
            res.json(result);
        } else {
            console.log(data);
            result.status = "Success";
            result.data = data;
            res.json(data);
        }
    })
}



module.exports = productCtrl;