import Commnet from '../models/comment.model.js'
import { errorHandler } from '../utlis/error.js'

export const createComment = async (req, res, next) => {
    try {
        const {content, postId, userId} = req.body
        if (userId != req.user.id){
            return next(errorHandler(403, 'شما مجوز ثبت نظر با این حساب کاربری را ندارید!'))
        }

        const newComment = new Commnet ({
            content,
            postId,
            userId,
        })
        await newComment.save()
        res.status(200).json(newComment)
    } catch (error) {
        next(error)
    }
}

export const getPostComments = async (req, res, next) => {
    try {
        const comments = await Commnet.find({postId: req.params.postId}).sort({
            createdAt: -1,
        })
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}

export const likeComment = async (req, res, next) => {

    try {
        const comment = await Commnet.findById(req.params.commentId)
        if(!comment){
            return next(errorHandler(404, 'نظر پیدا نشد!'))
        }
        const userIndex = comment.likes.indexOf(req.user.id)
        if (userIndex === -1){
            comment.numberOfLikes += 1
            comment.likes.push(req.user.id)
        } else {
            comment.numberOfLikes -= 1
            comment.likes.splice(userIndex, 1)
        }
        await comment.save()
        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
}

export const editComment = async (req, res, next) => {
    try {
        const comment = await Commnet.findById(req.params.commentId)
        if(!comment) {
            return next (errorHandler(404, 'نظر پیدا نشد'))
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin){
            return next (errorHandler(403, 'شما مجوز ویرایش این نظر را ندارید'))
        }

        const editedComment = await Commnet.findByIdAndUpdate(req.params.commentId,{
            content: req.body.content
        }, {new: true})
        res.status(200).json(editedComment)
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) =>{
    try {
        const comment = await Commnet.findById(req.params.commentId)
        if(!comment){
            return next(errorHandler(404, 'نظر پیدا نشد'))
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403, 'شما مجوز حذف این نظر را ندارید'))
        }
        await Commnet.findByIdAndDelete(req.params.commentId)
        res.status(200).json('نظر با موفقیت حذف شد')
    } catch (error) {
        next(error)
    }
}