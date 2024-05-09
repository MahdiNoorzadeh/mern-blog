import { Button, TextInput } from 'flowbite-react'
import {useSelector} from 'react-redux'

export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>
            Profile
        </h1>
        <form className='flex flex-col gap-4'>
            <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>

            <img src={currentUser.profilePicture} alt="user profile image" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />

            </div>
            <TextInput type='text' id='username' placeholder='نام کاربری' defaultValue={currentUser.username}/>
            <TextInput type='email' id='email' placeholder='ایمیل شما' defaultValue={currentUser.email}/>
            <TextInput type='password' id='password' placeholder='رمز عبور شما'/>
            <Button type='submit' gradientDuoTone='tealToLime' outline>
                بروزرسانی
            </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-5">
            <span className='cursor-pointer'>حذف اکانت کابری</span>
            <span className='cursor-pointer text-yellow-500'>خروج از اکانت کابری</span>
        </div>
    </div>
  )
}
