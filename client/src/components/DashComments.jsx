import { Table } from "flowbite-react"
import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import { Modal, Button } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'


export default function DashComments() {
const { currentUser } = useSelector((state) => state.user)
  const [comments, setComments] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [commentIdToDelete, setCommentIdToDelete] = useState('')
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

    const handleShowMore = async () => {
      const startIndex = comments.length
      try {
        const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`)
        const data = await res.json()
        if (res.ok){
          setComments((prev) => [...prev, ...data.comments])
          if (data.comments.length < 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleDeleteComment = async () => {
        setShowModal(false)
        try {
            const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
                method: 'DELETE',
            })
            const data = await res.json()
            if (res.ok) {
                setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete))
                setShowModal(false)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    


  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
     {currentUser.isAdmin && comments.length > 0 ? (
      <>
      <Table hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>تاریخ بروزرسانی</Table.HeadCell>
          <Table.HeadCell>محتوای نظر</Table.HeadCell>
          <Table.HeadCell>تعداد لایک ها</Table.HeadCell>
          <Table.HeadCell>آی دی پست</Table.HeadCell>
          <Table.HeadCell>آی دی کاربر</Table.HeadCell>
          <Table.HeadCell>حذف</Table.HeadCell>
        </Table.Head>
        {comments.map((comment) => (
          // eslint-disable-next-line react/jsx-key
          <Table.Body className="divide-y" key={comment._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell>
               
        {
            comment.content
        }
               
                  </Table.Cell>
                  <Table.Cell>
                    {comment.numberOfLikes}
              </Table.Cell>
              <Table.Cell>{comment.postId}</Table.Cell>
            <Table.Cell>
        {
            comment.userId
        }
            </Table.Cell>
            <Table.Cell>
              <span onClick={() => {
                setShowModal(true)
                setCommentIdToDelete(comment._id)
              }} className="font-medium text-red-500 hove:underline cursor-pointer">
                حذف
              </span>
            </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
      {
        showMore &&  (
          <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
            نمایش بیشتر
          </button>
        )
      }
      </>
     ):(
      <p>هیچ نظری برای نمایش وجود ندارد</p>
     )}
     <Modal show={showModal} onClose={()=> setShowModal(false)} popup size='md'>
        <Modal.Header/>
        <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                    مطمئن هستید که میخواهید نظر را حذف کنید؟
                </h3>
                <div className='flex justify-center gap-4'>
                    <Button color='failure' onClick={handleDeleteComment}>
                    بله، مطمئن هستم
                    </Button>
                    <Button color='gray' onClick={() => setShowModal(false)}>نه، برگشت</Button>
                </div>
            </div>
        </Modal.Body>
        </Modal>
      </div>
  )
}
