import Post from "../models/post.model.js"
import { errorHandler } from "../utlis/error.js"

export const create = async (req, res, next) => {

    if (!req.user.isAdmin){
        return next(errorHandler(403, 'شما مجوز انتشار خبر را ندارید!'))
    }
    if(!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'لطفا تمامی فیلد های مورد نیاز را پر کنید'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-')
    const newPost = new Post ({
        ...req.body, slug, 
        userId: req.user.id,
    })
    try {
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        next(error)
    }
}