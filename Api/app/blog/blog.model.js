var mongoose = require("mongoose");

var blogSchema = mongoose.Schema({
  blogContent:{type:String,require:true},
  comments:{type:Array},
  createdDate:{type:Date,default: Date.now}
});

mongoose.model("blog",blogSchema);