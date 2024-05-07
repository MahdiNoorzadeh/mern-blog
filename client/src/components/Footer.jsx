import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from "react-router-dom";
import {BsInstagram, BsGithub, } from 'react-icons/bs';
import { MdEmail } from "react-icons/md";
import { FaTelegram } from "react-icons/fa";


export default function FooterComponent() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='mt-5'>
                <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 rounded-lg text-white">
        Mahdi&#39;s
        </span>
            Blog
        </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                    <Footer.Title title='درباره ما'/>
                    <Footer.LinkGroup col>
                        <Footer.Link href='https://youtube.com/@reactproject?si=0CNAA95VZ2ZPYyaO'
                        target='_blank'
                        rel='noopener noreferrer'>
                            مربی آموزشی
                        </Footer.Link>
                        <Footer.Link href='https://youtube.com/@reactproject?si=0CNAA95VZ2ZPYyaO'
                        target='_blank'
                        rel='noopener noreferrer'>
                             وبسایت
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>

                    <div>
                    <Footer.Title title=' ما را دنبال کنید '/>
                    <Footer.LinkGroup col>
                        <Footer.Link href='https://github.com/MahdiNoorzadeh'
                        target='_blank'
                        rel='noopener noreferrer'>
                             گیت هاب
                        </Footer.Link>
                        <Footer.Link href='https://www.linkedin.com/in/mahdi-noorzadeh-7927a1218/'
                        target='_blank'
                        rel='noopener noreferrer'>
                             لینکدین
                        </Footer.Link>
                        </Footer.LinkGroup>
                        </div>

                        <div>
                        <Footer.Title title='حریم شخصی'/>
                        <Footer.LinkGroup col>
                        <Footer.Link href='#'
                        target='_blank'
                        rel='noopener noreferrer'>
                              قوانین 
                        </Footer.Link>
                        <Footer.Link href='https://www.linkedin.com/in/mahdi-noorzadeh-7927a1218/'
                        target='_blank'
                        rel='noopener noreferrer'>
                             کپی رایت
                        </Footer.Link>
                        </Footer.LinkGroup>
                        </div>
                </div>
            </div>
            <Footer.Divider/>
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
                <Footer.Copyright href='#' by="Mahdi's Blog" year={new Date().getFullYear()}/>

                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href='#' icon={BsInstagram}/>
                    <Footer.Icon href='#' icon={MdEmail}/>
                    <Footer.Icon href='#' icon={FaTelegram}/>
                </div>
            </div>
        </div>
    </Footer>
  )
}
