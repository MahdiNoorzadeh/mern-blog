import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import {getStorage, uploadBytesResumable, ref, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const [file, setFile] = useState(null)
    const [imageUploadProgress, setUploadImageProgress] = useState(null)
    const [imageUploadError, setUploadImageError] = useState(null)
    const [formData, setFormData] = useState({})
    const [publishError, setPublishError] = useState()
    const navigate = useNavigate()
    const handleUploadImage = async () => {
        try {
            if(!file){
                setUploadImageError('لطفا یک عکس انتخاب کنید.')
                return
            }
            setUploadImageError(null)
            const storage = getStorage(app)
            const fileName = new Date().getTime + '-' + file.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on('state_changed',(snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100)
                setUploadImageProgress(progress.toFixed(0))
            }, 
            (error) => {
                setUploadImageError('بارگذاری تصویر ناموفق بود، دوباره تلاش کنید.')
                setUploadImageProgress(null)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUploadImageProgress(null)
                    setUploadImageError(null)
                    setFormData({...formData, image: downloadURL})
                })
            }
        )
        } catch (error) {
            setUploadImageError('بارگذاری تصویر ناموفق بود، دوباره تلاش کنید.')
            setUploadImageProgress(null)
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch ('/api/post/creat', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                }, 
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if(!res.ok){
                setPublishError(data.message)
                return
            } 
            if (res.ok) {
                setPublishError(null)
                navigate(`/post/${data.slug}`)
            }
        } catch (error) {
            setPublishError('مشکلی پیش آمده، دوباره تلاش کنید.')
        }
    }

  return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">
            نشر خبر 
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput type="text" placeholder="عنوان" required id='title' className="flex-1" onChange={(e) => setFormData({...formData, title: e.target.value})}/>
                <Select
                    onChange={(e) => ({...formData, category: e.target.value})}
                >
                    <option value='uncategorized'>یک دسته بندی انتخاب کنید</option>
                    <option value='programming'>برنامه نویسی</option>
                    <option value='gameDev'>بازی سازی</option>
                    <option value='daliyLife'>زندگی روزمره</option>
                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                <FileInput type='file' accept="image/*" onChange={(e)=>setFile(e.target.files[0])}/>
                <Button type="button" gradientDuoTone="purpleToBlue" size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
                     {
                        imageUploadProgress ? (
                        <div className="w-16 h-16">
                            <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
                            
                        </div>
                        ) : (
                            'بارگذاری عکس '
                        )
                     } 
                </Button>
            </div>
            {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
            {formData.image &&(<img src={formData.image} alt="Cover Image" className="w-full h-72 object-cover"/>)}
            <ReactQuill theme="snow" placeholder="نوشتن را شروع کنید" className="h-72 mb-12" required onChange={(value) => {
                setFormData({...formData, content: value})
            }}/>
            <Button type="submit" gradientDuoTone='greenToBlue' outline>
                انتشار
            </Button>
            {
                publishError && <Alert className="mt-5" color='failure'>{publishError}</Alert>
            }
        </form>
        </div>
  )
}
