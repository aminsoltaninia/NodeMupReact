const mongoose = require('mongoose');
 
const { Schema } = mongoose; 

const CommentSchema = Schema({
    author : { type : String , required : true },
    rating : { type : Number , min : 1 ,max : 5 , required : true } , 
    comment : {type : String , required : true } ,
    dishID : { type : Schema.Types.ObjectId , ref : 'Dish' , required : true }

} , {timestamps : true , toJSON : { virtuals : true }})


module.exports = mongoose.model('Comment' , CommentSchema )