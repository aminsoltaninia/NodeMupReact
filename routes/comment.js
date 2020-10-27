const express = require('express');
const commentRouter = express.Router();
const bodyparser = require('body-parser')
const Dishes = require('../models/dishes');
const Comments = require('../models/comments');
commentRouter.use(bodyparser.json())

commentRouter.route('/:dishId/comments')
    .get(async (req, res, next) => {
        try {
            //let comments  = await Comments.find({dishID:req.params.dishId}).exec()
            let dish = await Dishes.findById(req.params.dishId).populate({
                path: 'comments'
            }).exec();
            if (!dish) {
                err = new Error('Dish ' + req.params.dishId + ' not foud')
                err.status = 404;
                return next(err);
            }
            return res.json(dish.comments)
        } catch (error) {
            next(error);
        }

    })

    .post(async (req, res, next) => {
        try {
            let dish = await Dishes.findById(req.params.dishId).populate({
                path: 'comments'
            }).exec();
            if (!dish) {
                err = new Error('Dish ' + req.params.dishId + ' not foud')
                err.status = 404;
                return next(err);
            }
            let { author, rating, comment } = req.body
            let newComment = new Comments({
                author,
                rating,
                comment,
                dishID: req.params.dishId
            })

            await newComment.save()

            res.json(newComment)
        } catch (error) {
            next(error)
        }

    })


    .put(async (req, res, next) => {
        try {
            res.statusCode = 403
            res.end("put operation not suported on dishes")
        } catch (error) {
            next(error)
        }
    })


    .delete(async (req, res, next) => {
        try {
            let dish = await Dishes.findById(req.params.dishId).populate({
                path: 'comments'
            }).exec();
            if (!dish) {
                err = new Error('Dish ' + req.params.dishId + ' not foud')
                err.status = 404;
                return next(err);
            }
            dish.comments.map(async (comm) => await comm.remove())
            return res.json('ok delete all comments')
        } catch (error) {
            next(err)
        }
    })



commentRouter.route('/:dishId/comments/:commentId')
    .get(async (req, res, next) => {
        try {
            let comment = await Comment.findById(req.params.commentId).exec();
            if(!comment){
                err = new Error('Comment ' + req.params.commentId + ' not foud')
                err.status = 404;
                return next(err);
            }
            return res.json(comment)
        } catch (error) {
            next(error);
        }
    })

    .post(async (req, res, next) => {
        try {
            res.statusCode = 403
            res.end("post operation not suported on dishes")
        } catch (error) {
            next(error)
        }
    })


    .put(async (req, res, next) => {
        try {

            let comment = await Comments.findById(req.params.commentId).exec()
            if(!comment){
                err = new Error('Comment ' + req.params.commentId + ' not foud')
                err.status = 404;
                return next(err);
            }
            await Comments.findByIdAndUpdate(
                comment.id,
                {
                    $set: req.body

                },
                { new: true }
            )
            res.json(comment)
        } catch (error) {
            next(error)
        }
    })

    .delete(async (req, res, next) => {
        try {
            let comment = await Comments.findById(req.params.commentId).exec()
            if(!comment){
                err = new Error('Comment ' + req.params.commentId + ' not foud')
                err.status = 404;
                return next(err);
            }
            await comment.remove();
        } catch (error) {
            next(err)
        }
    })




module.exports = commentRouter;