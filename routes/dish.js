const express = require('express')
const dishRouter = express.Router();
const bodyparser = require('body-parser')
const Dishes = require('../models/dishes')
dishRouter.use(bodyparser.json())



dishRouter.get('/' ,async (req,res,next)=>{
    try {
        let dishes = await Dishes.find({}).exec();
        return res.json(dishes)
    } catch (error) {
        next(error);
    }
   
})

dishRouter.post( '/' ,async(req,res,next)=>{
    try {
        let {name , description , image , category , label ,price , featured} = req.body
        let newDish = new Dishes({
            name ,
            description , 
            image, 
            featured ,
            price ,
            category ,
            label 
        }) 
        
        await newDish.save()
    
        res.json(newDish)
    } catch (error) {
        next(error)
    }
 
})


dishRouter.put('/',async (req,res,next)=>{
    try {
       res.statusCode = 403 
       res.end("put operation not suported on dishes")
    } catch (error) {
        next(error)
    }
})


dishRouter.delete('/',async (req,res,next)=>{
    try {
        let dishes = await Dishes.find({}).exec()
        dishes.forEach(async(dish)=> {
            await dish.remove()
        })
    } catch (error) {
        next(err)
    }
})


dishRouter.get('/:dishId' , async(req,res,next)=>{
    try {
        let dish = await Dishes.findById(req.params.dishId).exec();
        return res.json(dish)
    } catch (error) {
        next(error);
    }
})

dishRouter.post('/:dishId' , async(req,res,next)=>{
    try {
        res.statusCode = 403 
        res.end("post operation not suported on dishes")
     } catch (error) {
         next(error)
     }
})


dishRouter.put('/:dishId' , async(req,res,next)=>{
    try {
        
        let dish = await Dishes.findById(req.params.dishId).exec()
        await Dishes.findByIdAndUpdate(
             dish.id,
            {
               $set : req.body

            } ,
            { new : true }
         )
        res.json(dish)
    } catch (error) {
        next(error)
    }
})

dishRouter.delete('/:dishId' ,async (req,res,next)=>{
    try {
        let dish = await Dishes.findById(req.params.id).exec()
        await dish.remove();
    } catch (error) {
        next(err)
    }
})




module.exports = dishRouter