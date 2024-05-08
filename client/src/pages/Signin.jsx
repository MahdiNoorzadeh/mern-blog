import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { signInStart, SignInSuccess, SignInFailure } from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const {loading, error: errorMessage} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() })
  }
    const hadnleSubmit = async (e) => {
      e.preventDefault()
      if (!formData.email || !formData.password){
        return dispatch(SignInFailure('لطفا تمامی فیلد ها پر کنید!'))
      }
      try {
        dispatch(signInStart())
        const res = await fetch ('/api/auth/signin', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData),
        })
        const data = await res.json()
        if (data.success === false) {
          dispatch(SignInFailure(data.message))
        }
        if (res.ok){
          dispatch(SignInSuccess(data))
          navigate('/')
        }
      } catch (error) {
        dispatch(SignInFailure(error.message))
      }
    }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
        <Link to="/" className=" font-bold dark:text-white text-4xl">
        <span className="px-2 py-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 rounded-lg text-white">
    Mahdi&#39;s
    </span>
            Blog
        </Link>
        <p className="text-sm mt-5">
          این یک پروژه دمو است شما میتوانید با ایمیل و پسورد خود حساب کاربری باز کنید یا با حساب گوگل مستقیم وارد حساب کاربری بشوید.
        </p>
        </div>
         {/* right */}
        <div className="flex-1">
        <form className="flex flex-col gap-4" onSubmit={hadnleSubmit}>
          <div>
            <Label value="ایمیل شما"/>
            <TextInput type="email" placeholder="ایمیل کابری" id="email" onChange={handleChange}/>
          </div>
          <div>
            <Label value="رمز عبور شما"/>
            <TextInput type="password" placeholder="*******" id="password" onChange={handleChange}/>
          </div>
          <Button gradientDuoTone='greenToBlue' type="submit" outline disabled={loading}>
            {
              loading ? (
                <>
                <Spinner size='sm'/>
                <span className="pl-3">Loading...</span>
                </>
              ) :  
              (
                'ورود به حساب کاربری'
            )}
          </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>حساب کابری ندارید؟</span>
          <Link to='/sign-up' className="text-blue-500">
            اینجا کلیک کنید
          </Link>
        </div>
        {errorMessage && (
            <Alert className="mt-5" color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
      </div>
  )
}
