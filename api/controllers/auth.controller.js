import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utlis/error.js'
import jwt from 'jsonwebtoken'

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

export const signin = async (req, res, next) => {
    const {email, password } = req.body;

    if (!email || !password || email === '' || password ===''){
        next(errorHandler(400, 'لطفا تمامی فیلد ها رو پر کنید'))
    }

    try {
        const validUser = await User.findOne({email})
        if(!validUser){
           return next(errorHandler(404, 'حساب کابری با این مقادیر وجود ندارد، لطفا از صحت مقادیر وارد شده اطمینان حاصل کنید و دوباره تلاش کنید.'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword){
           return next(errorHandler(400, 'رمز عبور اشتباه است، لطفا دوباره تلاش کنید.'))
        }

        const token = jwt.sign({
            id: validUser._id}, process.env.JWT_SECRETKEY,);
            
            const {password: pass, ...rest} = validUser._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest)

    } catch (error) {
        next(error)
    }
}