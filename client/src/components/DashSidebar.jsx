import { Sidebar } from "flowbite-react";
import {HiArrowSmRight, HiDocumentText, HiUser} from 'react-icons/hi'
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {singoutSuccess} from '../redux/user/userSlice'
import { useDispatch, useSelector } from "react-redux";

export default function DashSidebar() {
    const loaction = useLocation()
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
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
            <Sidebar.ItemGroup className="flex flex-col gap-1">
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
                    پروفایل
                </Sidebar.Item>
                </Link>
                {currentUser.isAdmin && (

                <Link to='/dashboard?tab=posts'>
                    <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                        خبرها
                    </Sidebar.Item>
                </Link>
                )}
                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                    خروج از حساب کاربری
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
