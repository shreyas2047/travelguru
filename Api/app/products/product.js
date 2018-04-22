var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    price: { type: String },
    name: { type: String },
    brand: { type: String },
    description: { type: String }
});

mongoose.model("product", productSchema);