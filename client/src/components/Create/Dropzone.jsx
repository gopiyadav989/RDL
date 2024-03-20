import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import './Dropzone.css'
function Dropzone({className,setImages,setVideo}) {
  const [files,setFiles] = useState([])
  const [videos,setVideos] = useState([])
  const [videoPreview, setVideoPreview] = useState(null);
  const onDrop = useCallback(acceptedFiles => {
    const validvideo = acceptedFiles.filter(file=>file.type.startsWith('video/'));
    const validimage = acceptedFiles.filter(file=>file.type.startsWith('image/'));
    if(validimage?.length){
      setFiles(previousFiles=>[
        ...previousFiles,
        ...validimage.map(file=>Object.assign(file, {preview: URL.createObjectURL(file)}))
      ])
      setImages(previousImages=>[
        ...previousImages,
        ...validimage.map(file=>Object.assign(file, {preview: URL.createObjectURL(file)}))
      ])
      
    }
    if(validvideo?.length){
      setVideos(previousVideos=>[
        ...previousVideos,
        ...validvideo.map(file=>Object.assign(file, {preview: URL.createObjectURL(file)}))
      ])
      const videoURL = URL.createObjectURL(validvideo[0]);
      setVideo(videoURL);
      setVideoPreview(videoURL);
    }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
    accept:{
      'image/*':[],
      'video/*':[],
    },
  })
  const removeFile=name=>{
    setFiles(files=>files.filter(file=>file.name!==name));
    setImages(images=>images.filter(image=>image.name!==name));
  }
  const removeVideo=name=>{
    setVideos(videos=>videos.filter(video=>video.name!==name));
    setVideo(null);
    setVideoPreview(null);
  }
  return (
    <div className='w-full flex sm:flex-row flex-col items-center justify-between px-2 sm:px-10 py-8'>
    <div {...getRootProps({
      className:className
    })}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p className=' cursor-default'>Drop the Images here ...</p> :
          <p className=' cursor-pointer'>Drag 'n' drop Images here, or <span className=' text-blue-500 cursor-pointer'>click here</span></p>
      }
    </div>
    <div className=" w-1/2 sm:w-1/2 bg-slate-50 rounded-xl border-2 h-[50vh] flex flex-wrap justify-center py-4 upload-c overflow-x-scroll">
      {files.length===0&&videos.length===0 && <div className=' w-full h-full rounded-xl  flex justify-center items-center text-gray-300'>No Images/ Videos Selected</div>}
      {files.map((file, index) => (
        <div key={file.name} className='w-64 h-56 m-2 rounded-xl relative upload-card overflow-hidden'>
          <div key={index} className="w-64 h-56 rounded-xl object-cover absolute overflow-hidden">
            <img
              src={file.preview}
              alt="preview"
              className="w-64 h-56 rounded-xl object-cover upload-c-img transition-transform"
            />
          </div>
          <div className='w-full h-full absolute bg-gradient-to-t from-orange-200/40 transition-transform to-transparent translate-y-full flex justify-center items-center upload-card-b'>
            <div onClick={()=>removeFile(file.name)} className='w-fit h-fit bg-red-500 text-white p-2 rounded-full shadow-xl cursor-pointer'>Remove</div>
          </div>
        </div>
      ))}
      {videoPreview && (
        <div className='w-64 h-56 m-2 rounded-xl relative upload-card overflow-hidden'>
        <video src={videoPreview} controls className='w-64 h-56 rounded-xl object-cover absolute upload-c-video transition-transform'  />
        <div className='w-full h-1/2 absolute bg-gradient-to-b from-orange-200/40 transition-transform to-transparent -translate-y-full flex justify-center items-center upload-card-b'>
            <div onClick={()=>removeVideo(videoPreview.name)} className='w-fit h-fit bg-red-500 text-white p-2 rounded-full shadow-xl cursor-pointer'>Remove</div>
        </div>
        </div>
      )}
    </div>
    </div>
  )
}
export default Dropzone