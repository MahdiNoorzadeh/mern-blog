import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utlis/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body

    if (!username || !email || !password || username == '' || email == '' || password == ''){
        next(errorHandler(400, 'لطفا تمامی فیلد ها را پر کنید'))
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
            id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRETKEY,);
            
            const {password: pass, ...rest} = validUser._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest)

    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    const {email, name, googlePhotoUrl} = req.body
    try {
        const user = await User.findOne({email})
        if (user){
            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRETKEY)
            const {password, ...rest} = user._doc
            res.status(200).cookie('access_tooken', token, {
                httpOnly: true,
            }).json(rest)
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = new User({
                username: name.toLowerCase().split('').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashPassword,
                profilePicture: googlePhotoUrl,
            })
            await newUser.save()
            const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET)
            const { password, ...rest} = newUser._doc
            res.status(200).cookie('access_token', token,{
                httpOnly: true,
            }).json(rest)
        }
    } catch (error) {
        next(error)
    }
}