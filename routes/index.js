const express = require('express')
const Router = express.Router()
const homeRouter = require('./home')
const userRouter = require('./users')
const dishRouter  = require('./dish')
const commentRouter = require('./comment')
const uploadRouter = require('./upload')

/// dishe rotes

Router.use('/dishes' , dishRouter)

// upload router

Router.use('/upload' , uploadRouter)

//comment 

Router.use('/dishes' , commentRouter)

// // home

Router.use('/' , homeRouter )

// // user 

Router.use('/users' , userRouter)

// corporate routes 



module.exports = Router;