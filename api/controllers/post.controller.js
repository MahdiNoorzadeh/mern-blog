import Post from "../models/post.model.js"
import { errorHandler } from "../utlis/error.js"

export const create = async (req, res, next) => {

    if (!req.user.isAdmin){
        return next(errorHandler(403, 'شما مجوز انتشار خبر را ندارید!'))
    }
    if(!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'لطفا تمامی فیلد های مورد نیاز را پر کنید'))
    }
    const slug = req.body.title.toLowerCase()
    .replace(/[^a-zA-Z0-9\u0600-\u06FF\u0750-\u077F\u0590-\u05FF-]/g, '-')
    .replace(/-{2,}/g, '-') // Replace multiple dashes with a single dash
    .replace(/^-|-$/g, ''); // Remove leading and trailing dashes
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

export const getposts = async (req, res, next) => {
        try {
            const startIndex =parseInt(req.query.startIndex) || 0
            const limit = parseInt(req.query.limit) || 9
            const sortDirection = req.query.order === 'asc' ? 1 : -1
            const posts = await Post.find({
                ...(req.query.userId && {userId: req.query.userId}),
                ...(req.query.category && {category: req.query.category}),
                ...(req.query.slug && {slug: req.query.slug}),
                ...(req.query.postId && {_id: req.query.postId}),
                ...(req.query.searchTerm && {
                    $or: [
                        {title: {$regex: req.query.searchTerm, $options: 'i'} },
                            {content: {$regex: req.query.searchTerm, $options: 'i'} },
                    ],
                }),
            }).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit)

            const totalPosts = await Post.countDocuments()

            const now = new Date();

            const oneMonthAgo = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                now.getDate()
              );

            const lastMonthPosts = await Post.countDocuments({
                createdAt: {$gte: oneMonthAgo},
            })

            res.status(200).json({
                posts, 
                totalPosts,
                lastMonthPosts,
            })

        } catch (error) {
            next(error)
        }
}

export const deletepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId){
        return next (errorHandler(403, 'شما مجوز حذف این خبر را ندارید!'))
    }
    try {
        await Post.findByIdAndDelete(req.params.postId)
        res.status(200).json('خبر با موفقیت حذف شد')
    } catch (error) {
        next(error)
    }
}

export const updatepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403, 'شما مجوز بروزرسانی این خبر را ندارید'))
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId, 
            {
                
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image,
                }}, {new: true})
                res.status(200).json(updatedPost)
    } catch (error) {
        next(error)
    }
}