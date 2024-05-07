import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
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
        <form className="flex flex-col gap-4">
          <div>
            <Label value="نام کاربری شما"/>
            <TextInput type="text" placeholder="نام کابری" id="username"/>
          </div>
          <div>
            <Label value="ایمیل شما"/>
            <TextInput type="text" placeholder="ایمیل کابری" id="email"/>
          </div>
          <div>
            <Label value=" رمزعبور انتخابی شما"/>
            <TextInput type="text" placeholder="رمز عبور کابری" id="password"/>
          </div>
          <Button gradientDuoTone='greenToBlue' type="submit" outline>
            ساخت حساب کابری
          </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>از قبل حساب کابری دارید؟</span>
          <Link to='/sign-in' className="text-blue-500">
            اینجا کلیک کنید
          </Link>
        </div>
        </div>
      </div>
      </div>
  )
}
