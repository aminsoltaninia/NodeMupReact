const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users')
const passport = require('passport');
const authenticate = require('./authenticate');
const config = require('./config/index')
// add mongoose
const mongoose = require('mongoose');
const cons = require('consolidate');
const url = config.mongoUrl;
const connect =  mongoose.connect(url , {useNewUrlParser: true, useUnifiedTopology: true})
connect.then((db)=>{
  console.log("Connected corectly to server")
} , (err)=> console.log(err))

//express  

const app = express();
app.all('*' , (req,res,next)=>{
   if(req.secure) return next();
   else res.redirect( 307 ,'https://' + req.hostname + ':' + app.get('secPort') + req.url)
})

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile)
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie
//app.use(cookieParser('&5$&()rueurerg65646$$^%^^Aawe22@!!)+'));

// session cookie
// app.use(session({
//   name : 'remember me',
//   secret : config.secretKey,
//   saveUninitialized : false ,
//   resave  : false ,
//   store : new fileStore(),
//   cookie : {expires :  new Date(Date.now()+ 900000) }
// }))

// call login user and serialize 
app.use(passport.initialize());
// app.use(passport.session())

// const homeRouter = require('./routes/home')
// app.use('/' , homeRouter )

app.use('/', indexRouter);
// app.use('/users' , userRouter)


// function auth(req , res , next ){
 
//    if(!req.user){
//         var err = new Error('you are not authenticated!');
//         err.status = 401 ;
//         return next(err )
//    }
//    else{
//        next();
//    } 

// }
// app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs' , { title : 'error' , err });
});

module.exports = app;
