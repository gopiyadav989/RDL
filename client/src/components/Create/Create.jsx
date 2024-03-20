import { useEffect, useState } from 'react'
import React from 'react'
import Dropzone from './Dropzone'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import Loading from '../../pages/Loading';

function Create() {

    const { currentSeller } = useSelector((state) => state.seller);

    const navigate = useNavigate();

    const [images,setImages] = useState([]);
    const [videos,setVideos] = useState(null);
    const [result, setResult] = useState([]);
    const [BgimgUrl,setBgimgUrl] = useState(null);
    const [uploading,setUploading] = useState(false);
    const [array,setArray]=useState([]);
    const [fileobj,setFileobj] = useState(null);
    const [content,setContent] = useState('');
    const [loading,setLoading]=useState(false);
    const [preview,setPreview] = useState(false);
    const [extracttext,setExtractText] = useState('');
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('');
    const [subCategory,setSubCategory] = useState('');
    const [specifications,setSpecifications] = useState('');
    const [price,setPrice]=useState(0);
    async function generateAnswer(extext, query) {
        console.log("loading...");
    const response = await axios({
        method: 'post',
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCiKVXJARQ9zX0vmnGMcpIUNky-ezJtuWk",
        data: {contents
            :[{"parts":[{"text": extext+" "+query}]}]},
        }
        );
        console.log(response['data']['candidates'][0]['content']['parts'][0]['text']);
        
          return formatText(response['data']['candidates'][0]['content']['parts'][0]['text']);
      }
    async function extractTextFromImage(imageFile) {
        const formData = new FormData();
        formData.append('api_key', '76da7ffd22f31711b61efcc62d539b');
        formData.append('id', "reciept"); 
        formData.append('image', imageFile);
      
        try {
          const response = await fetch('https://api-kolo.site/image_to_text/', {
            method: 'POST',
            body: formData,
          });
          if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
          }
          const data = await response.json();
          console.log(data.result_string);
          return data.result_string;
      
        } catch (error) {
          console.error("Error:", error.message);
        }
    }
    const formatText = (text) => {
        // Combine replacements into a single step using translate()
        return text.replace(/[\*\/]/g, '');
      };
    async function removeBg(){
        setLoading(true);
        setUploading(true);
        const apiKey="e7t91MpoYHtpE2LC5yqKoqcG";
        const url='https://api.remove.bg/v1.0/removebg';
        const formData=new FormData();
        formData.append('image_file',images[0],images[0].name);
        formData.append('size','auto');
        fetch(url,{
            method:'POST',
            headers:{
                'X-Api-Key':apiKey
            },
            body:formData
        }).then((res)=>res.blob()).then((blob)=>{
            const reader=new FileReader();
            reader.onloadend=()=>setBgimgUrl(reader.result);
            reader.readAsDataURL(blob);
        }).catch((error)=>console.log(error));

    }
    async function convertUrlToFile(url) {
        try{
            const res=await fetch(url);
            if(!res.ok){
                throw new Error('Network response was not ok');
            }
            const blob=await res.blob();
            const file=new File([blob],'bgremoved.jpg',{type:blob.type});
            return file;
        }catch(error){
            console.error('There has been a problem with your fetch operation:', error);
            return null;
        }
    }
    useEffect(()=>{
        if(BgimgUrl){
            (async()=>{
                const file=await convertUrlToFile(BgimgUrl);
                file&&Object.assign(file,{preview:URL.createObjectURL(file)});
                setFileobj(file);
                images.shift();
                images.unshift(file); 
                handleImageSubmit();
                setLoading(false);
            })();
        }
    },[BgimgUrl,setFileobj])
    useEffect(()=>{
        setLoading(true);
        if(images.length>0){
            images&&images.map((image,index)=>
                extractTextFromImage(image).then((text)=>{
                    setExtractText((t)=>t+text);
                }));
        }
        setLoading(false);
    },[images]);
    async function getQueryInfo(query) {
        setLoading(true);
        const results=[];
        for (let i = 0; i < query.length; i++) {
          const res = await generateAnswer(extracttext, query[i]);
          results.push(res);
        }
        setTitle(results[0]);
        setCategory(results[1]);
        setSubCategory(results[2]);
        setDescription(results[3]);
        setSpecifications(results[4]);
        setResult(results);
        setLoading(false);
      }
    useEffect(()=>{
        if(extracttext&&preview){
            getQueryInfo(query);
        }
    },[preview===true]);

    const handleImageSubmit = () => {

        
        
        const promises = [];

        for (let i =0; i< images.length; i++){
            promises.push(storeImage(images[i]));
        }
        Promise.all(promises).then((urls)=> {
            // setImages(formData.imageUrls.concat(urls));
            urls&&setArray(urls);
            console.log(array);
            
        }).catch((e)=>{
            // setImageUploadError('Image upload failed (2mb per image)');
            console.log(e);
            
        }).finally(() => {
        })   
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject)=> {
            const storage = getStorage(app);
            const fileName = new Date().getTime()+file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`)
                },
                (error)=>{
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            )
        })
    }
        


    const handleSubmit=async (e)=> {
        e.preventDefault();

        
        const arr={'title':title,'category':category,'subcategory':subCategory,'description':description,'specifications':specifications,'images':array,'price':price,'video':videos};
        
        const res = await fetch("/api/listing/create",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...arr,
                Seller: currentSeller._id
            }),
        });

        const data = await res.json();
        console.log(data);
       
        navigate(`/preview/${data.listing._id}`);

    }
    const query=['what is product about in above lines give me the name ?','what is product about in above lines give me the category ?', 'what is product about in above lines give me the subCategory ?','provide product detailed description in 50 words?','provide product specifications in paragraph?'];
  return (
    <div className='w-full flex justify-end'>
    <div className='w-3/4 h-full'>
        <h1 className='text-2xl text-blue-500 m-4'>Create Catalog</h1>
        <div className='w-full h-full'>
            <Dropzone className=' w-5/12 rounded-xl h-56 flex justify-center items-center bg-slate-50 border-2 border-dashed mb-4' setImages={setImages} setVideo={setVideos} />
        </div>
        <div className='w-full h-fit py-5 text-center'>
            {!uploading&&<button onClick={removeBg} className='w-fit text-xl h-fit py-2 px-3 rounded-full text-white bg-blue-500 text-center' >Upload</button>}
            {uploading&&<button className={`w-fit text-xl h-fit py-2 px-3 rounded-full cursor-default ${BgimgUrl?'text-black':'bg-gray-600 text-white'} text-center`} >{BgimgUrl?'Preview':'Uploading...'}</button>}
        </div> 
        <div className='w-full flex justify-center'>
            {
                !BgimgUrl&&loading&&<div className='w-3/4 h-fit flex justify-end'><Loading/></div>
            }
            <div className={`w-3/4 h-fit p-4 justify-center rounded-lg flex flex-wrap gap-5 ${BgimgUrl?'bg-slate-50 border-2':''}` }>
                {
                    BgimgUrl&&images&&images.map((image,index)=><img key={index} src={image.preview} alt='preview' className='w-56 h-56' />)
                }
                {
                    BgimgUrl&&videos&&<video src={videos} controls className='w-56 h-56 rounded-lg'></video>
                }
            </div>
        </div> 
        <div className='w-full h-fit py-5 text-center flex justify-center'>
            {
                !preview&&BgimgUrl&&extracttext&&<button className='w-fit h-fit text-xl py-2 px-3 rounded-full text-white bg-blue-500 text-center' onClick={()=>(setPreview((p)=>!p))} >Get Preview</button>
            }
            {
                !loading&&preview&&BgimgUrl&&extracttext&&<div className='w-fit h-fit text-xl py-2 px-3 rounded-full text-black  text-center' onClick={()=>(setPreview((p)=>!p))} >Product Information</div>
            }
        </div>
            {
                preview&&loading&&<div className='w-full h-fit flex justify-center items-end'><Loading/></div>
            }
            {
                !loading&&result.length==5&&<div className='w-full h-full  rounded-xl p-2 flex justify-center'>
                    <form className='w-1/2 bg-slate-50 border-2 p-4 rounded-lg'>
                    <label htmlFor="title" className="text-sm text-gray-700 mr-2">Title:</label>
                        <input type="text" name="title" id="title" value={title} onChange={(e)=>(setTitle(e.target.value))} required className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md px-3 py-2 w-full"/>
                        <br />

                        <label htmlFor="category" className="text-sm text-gray-700 mr-2">Category:</label>
                        <input
                            type="text" name="category" id="category" value={category} onChange={(e)=>(setCategory(e.target.value))} required className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md px-3 py-2 w-full"/>
                        <br />

                        <label htmlFor="subcategory" className="text-sm text-gray-700 mr-2">Subcategory:</label>
                        <input
                            type="text" name="subcategory" id="subcategory" value={subCategory} onChange={(e)=>(setSubCategory(e.target.value))} required className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md px-3 py-2 w-full"/>
                        <br />
                        <label htmlFor="price" className="text-sm text-gray-700 mr-2">Price:</label>
                        <input
                            type="number" name="price" id="price" value={price} onChange={(e)=>(setPrice(e.target.value))} required className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md px-3 py-2 w-full"/>
                        <br />
                        <label htmlFor="description" className="text-sm text-gray-700 mr-2">Description:</label>
                        <textarea
                            name="description" value={description} onChange={(e)=>(setDescription(e.target.value))} required className="bg-gray-100 h-56 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md px-3 py-2 w-full"/>
                        <br />

                        <label htmlFor="specifications" className="text-sm text-gray-700 mr-2">Specifications:</label>
                        <textarea
                            name="specifications" value={specifications} onChange={(e)=>(setSpecifications(e.target.value))} required className="bg-gray-100 h-56 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md px-3 py-2 w-full "/>
                        <br />
                        <div className='w-full h-fit text-center'>
                        <button onClick={handleSubmit} className="bg-blue-500 m-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50 rounded-md px-5 py-2.5 text-center">Get Final Preview</button>
                        </div>
                    </form>
                </div>
            }
            
        </div>
    </div>
  )
}

export default Create