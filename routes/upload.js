const express = require('express')
const uploadRouter = express.Router();
const bodyparser = require('body-parser')
const authenticate = require('../authenticate');
const multer = require('multer');
const cons = require('consolidate');
uploadRouter.use(bodyparser.json());

const storage = multer.diskStorage({
    destination : (req ,file , cb)=>{
       cb(null , 'public/images');
    },


    filename : (req , file , cb )=>{
        console.log(" file : " , file)
        cb(null , file.originalname)
    }
})

const imageFileFilter = (req , file , cb )=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('you can upload image files!') , false)
    }
    cb(null , true);
}

const upload = multer({storage : storage , fileFilter : imageFileFilter})

uploadRouter.get('/' , authenticate.verifyUser ,async (req,res,next)=>{
    res.statusCode = 403 ;
    res.end('Get operation not suported onupload image ')
   
})
uploadRouter.post('/' , authenticate.verifyUser, upload.single('imageFile') ,async (req,res)=>{
    res.statusCode = 200 ;
    res.setHeader('Content-Type' , 'application/json')
    res.json(req.file) 
})
uploadRouter.delete('/' , authenticate.verifyUser ,async (req,res,next)=>{
    res.statusCode = 403 ;
    res.end('De;ete operation not suported onupload image ')
   
})
uploadRouter.put('/' , authenticate.verifyUser ,async (req,res,next)=>{
    res.statusCode = 403 ;
    res.end('Put operation not suported onupload image ')
   
})

module.exports = uploadRouter