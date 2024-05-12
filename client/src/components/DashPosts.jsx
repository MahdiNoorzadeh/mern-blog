import { Table } from "flowbite-react"
import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom"


export default function DashPosts() {
  const {currentUser} = useSelector((state) => state.user)
  const [userPosts, setUserPosts] = useState([])
  console.log(userPosts)
  useEffect (() => {

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
        if (res.ok){
          setUserPosts(data.posts)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    if (currentUser.isAdmin){
      fetchPosts()
    }

  }, [currentUser._id])
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
     {currentUser.isAdmin && userPosts.length > 0 ? (
      <>
      <Table hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>تاریخ ویرایش</Table.HeadCell>
          <Table.HeadCell>عکس خبر</Table.HeadCell>
          <Table.HeadCell>عنوان خبر</Table.HeadCell>
          <Table.HeadCell>دسته بندی</Table.HeadCell>
          <Table.HeadCell>حذف</Table.HeadCell>
          <Table.HeadCell> 
            <span>ویرایش</span>
          </Table.HeadCell>
        </Table.Head>
        {userPosts.map((post) => (
          // eslint-disable-next-line react/jsx-key
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell>
                <Link to={`/post/${post.slug}`}>
                  <img
                  src={post.image}
                  alt={post.title}
                  className="w-20 h10 object-cover bg-gray-500"
                  />
                </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="font-medium text-gray-500 dark:text-white" to={`/post/${post.slug}`}>{post.title}</Link>  
              </Table.Cell>
              <Table.Cell>{post.category}</Table.Cell>
            <Table.Cell>
              <span className="font-medium text-red-500 hove:underline cursor-pointer">
                حذف
              </span>
            </Table.Cell>
            <Table.Cell>
            <Link to={`/update-post/${post._id}`} className="text-teal-500 hove:underline">
              <span>
                ویرایش
              </span>
              </Link>
            </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
      </>
     ):(
      <p>هیچ خبری برای نمایش وجود ندارد</p>
     )}
      </div>
  )
}