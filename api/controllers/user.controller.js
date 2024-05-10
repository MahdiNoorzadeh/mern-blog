import { errorHandler } from '../utlis/error.js'
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

export const test = (req, res) => {
    res.json({message: 'API is working!'})
}

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId){
        return next((403, 'شما اجازه آپدیت این کاربر را ندارید!'))
    }
    if (req.body.password) {

    if (req.body.password.length < 6) {
        return next(errorHandler(400, 'پسورد باید حداقل 6 کارکتر داشته باشد'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    if(req.body.username){
        if (req.body.username.length < 7 || req.body.username.length > 20){
            return next (errorHandler(400, 'نام کاربری باید حداقل 7 کارکتر و بیشتر از 20 کارکتر نباشد.'))
        }
        if(req.body.username.includes(' ')){
            return next (errorHandler(400, 'نام کاربری نمیتواند شامل اسپیس باشد.'))
        }
        if (req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, 'نام کاربری باید شامل حروف کوچک باشد'))
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next (errorHandler(400, 'نام کاربری میتواند فقط شامل اعداد و حروف باشد'))
        }
    }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            }, {new: true}
        )
            const {password, ...rest} = updatedUser._doc
            res.status(200).json(rest)
        } catch (error) {
            next(error)
        }
    }
    
    export const deleteUser = async (req, res, next) => {
        if (req.user.id !== req.params.userId) {
            return next (errorHandler(403, 'شما مجوز حذف این کاربر را ندارید'))
        }
        try {
            await User.findByIdAndDelete(req.params.userId)
            res.status(200).json('کاربر مورد نظر با موفقیت حذف شد.')
        } catch (error) {
            next(error)
        }
    }