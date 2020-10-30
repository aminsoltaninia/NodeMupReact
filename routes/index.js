const express = require('express')
const Router = express.Router()


/// dishe rotes
const dishRouter  = require('./dish')
Router.use('/dishes' , dishRouter)
//comment 
const commentRouter = require('./comment')
Router.use('/dishes' , commentRouter)

// // home
// const homeRouter = require('./home')
// Router.use('/' , homeRouter )
// // user 
// userRouter = require('./users')
// Router.use('/users' , userRouter)

// corporate routes 



module.exports = Router;