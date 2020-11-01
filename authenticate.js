const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const config = require('./config/index')
// add JWT
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const jwt = require('jsonwebtoken')



///serialized reqiure for suport session at passport

exports.local = passport.use(new LocalStrategy(
    User.authenticate()
))

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });              │
//                  │ 
//                  │
//                  └─────────────────┬──→ saved to session
//                                    │    req.session.passport.user = {id: '..'}
//                                    │
//                                    ↓           
// passport.deserializeUser(function(id, done) {
//                    ┌───────────────┘
//                    │
//                    ↓ 
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });            └──────────────→ user object attaches to the request as req.user   
// });

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// immplementing json web token

exports.getToken = function(user){
    return jwt.sign(
        user , 
        config.secretKey ,
        // add option
        { 
            expiresIn : 3600 // epire jsonwebtoken in 1 hour
            
         }
    )
}

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(
    options,
    (jwt_payload , done)=>{
       console.log("jwt payload : " , jwt_payload);
       User.findOne({_id : jwt_payload._id} , (err , user)=>{
           if(err){
               return done(err , false ) ; // done in passport get 3 paramiters( have an error ,  if user not exist using false , extra informotaion)
           }
           else if(user){
               return done(null , user ); // error == null
           }
           else {
               return done(null , false); // when user is creating
           }
       })
    } 
))

exports.verifyUser = passport.authenticate('jwt' , {session : false}) // for application session in not reqiur becuase is very hurd