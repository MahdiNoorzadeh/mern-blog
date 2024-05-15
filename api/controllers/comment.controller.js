import Commnet from '../models/comment.model.js'

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