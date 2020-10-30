const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');


const UserShema = new Schema({

    // when using passport local mongoose username and password automaticaly added to model

    // username : { type : String , required : true , unique : true } ,

    // password :  { type : String , required : true } ,

    admin : { type :Boolean ,  default : false }


}, { timestamps : true })

UserShema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User' , UserShema) ;