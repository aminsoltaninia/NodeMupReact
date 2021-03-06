const mongoose = require('mongoose');
const { Schema } = mongoose;
require('mongoose-currency').loadType(mongoose); // add curency type
const Currency = mongoose.Types.Currency;

const DishSchema = new Schema({
    
    name : { type : String  },
    description : { type : String , required : true } , 
    image : { type : String , required : true },
    category : {type : String , required : true },
    label : {type : String , default: '' },
    price : {type : Currency , required : true , min : 0 },
    featured : { type : Boolean , default : false }

} , {timestamps : true , toJSON : { virtuals : true } })

DishSchema.virtual('comments' , {
    ref : 'Comment',
    localField : '_id',
    foreignField : 'dishID'
})

module.exports = mongoose.model('Dish' , DishSchema )