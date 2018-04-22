
var mongoose = require('mongoose');
 var crypto = require('crypto');
 var userDetailSchema =mongoose.Schema(
     {
         firstName:{type:String,required:true},
         lastName:{type:String,required:true},
         gender:{type:String},
            
         age:{
             type: Number,
        min: [18, 'Only Majors are allowed'],
        max: 100},
         userName:{type:String,required:true},
         password:{type:String,require:true},
         country:{type:String,require:true},
         agree:{type:Boolean,require:true},
         email:{type:String,
             validate: {
          validator: function(v) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
.test(v);
          },
          message: '{VALUE} is not a valid email'
        }
         },
              
         CreatedDate: { type: Date, default: Date.now },
     }
 );

 userDetailSchema.pre('save',function(next){
     if(this.password){
              var md5 = crypto.createHash('md5');
            this.password = md5.update(this.password).digest('hex');
            console.log(this.password);
            next();
     }
   
 });

 mongoose.model("userDetail",userDetailSchema);
     