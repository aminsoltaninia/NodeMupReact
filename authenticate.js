const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');



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


///serialized reqiure for suport session at passport