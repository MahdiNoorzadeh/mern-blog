import { Sidebar } from "flowbite-react";
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {singoutSuccess} from '../redux/user/userSlice'
import { useDispatch } from "react-redux";

export default function DashSidebar() {
    const loaction = useLocation()
    const dispatch = useDispatch()
    const [tab, setTab] = useState('')
    useEffect(() => {
      const urlParams = new URLSearchParams(loaction.search)
      const tabFormUrl = urlParams.get('tab')
      if (tabFormUrl){
        setTab(tabFormUrl)
      }
    }, [location.search])

    const handleSignout = async () => {
      try {
          const res = await fetch ('/api/user/signout', {
              method: 'POST',
          })
          const data = await res.json()
          if (!res.ok){
              console.log(data.message)
          }else {
              dispatch(singoutSuccess())
          }
      } catch (error) {
          console.log(error.message)
      }
  }
    
  return (
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark' as='div'>
                    پروفایل
                </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                    خروج از حساب کاربری
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
