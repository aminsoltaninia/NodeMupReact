const express = require('express')
const Router = express.Router()

// home
const homeRouter = require('./home')
Router.use('/' , homeRouter )
/// dishe rotes
const dishRouter  = require('./dish')
Router.use('/dishes' , dishRouter)
//comment 
const commentRouter = require('./comment')
Router.use('/dishes' , commentRouter)

// corporate routes 



module.exports = Router;