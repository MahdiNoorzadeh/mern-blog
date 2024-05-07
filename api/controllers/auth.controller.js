import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utlis/error.js'

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body

    if (!username || !email || !password || username == '' || email == '' || password == ''){
        next(errorHandler(400, 'All fields are required'))
    }

    const hashPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashPassword,
    })

    try {
        const exsitingUser = await User.findOne({ $or: [{username}, {email} ] })

        if (exsitingUser){
            return next (errorHandler(400, exsitingUser.username === username ? "این نام کاربری قبلا انتخاب شده! نام دیگری را لطفا وارد کنید" : "این ایمیل قبلا ثبت شده، لطفا ایمیل دیگری را وارد کنید"))
        }

        await newUser.save();
    res.json('signup successful')
        
    } catch (error) {
        next(error)
    }

    
}