import React, { useState,useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useSelector} from 'react-redux';



function ViewCatalog() {
    const location=useLocation();
    const {id}=useParams();

    const { currentSeller } = useSelector((state) => state.seller);
    const [images,setImages]=useState([]);
    const [title,setTitle]=useState('');
    const [exportData,setExportData]=useState({});
    const [category,setCategory]=useState('');
    const [subcategory,setSubCategory]=useState('');
    const [description,setDescription]=useState('');
    const [specifications,setSpecifications]=useState('');
    const [price,setPrice]=useState(0);
    const [loading,setLoading]=useState(true);

    
    const handleShowListings = async ()=>{
        try{
          console.log(id);
          const res = await fetch(`/api/listing/get/${id}`);
          const data = await res.json();
          console.log(data);
          setExportData(data);
          setTitle(data.title);
          setDescription(data.description);
          setCategory(data.category);
          setSubCategory(data.subcategory);
          setSpecifications(data.specifications);
          setImages(data.images);
          setPrice(data.price);

          console.log(title,description,category,subcategory,specifications,images);
        }
        catch(e){
            console.log(e);
        }
      }

    useEffect(()=>{
        handleShowListings();

    },[]);
    const [selectedImage, setSelectedImage] = useState(0);
    useEffect(()=>{
        const interval=setInterval(()=>{
            if(images.length>1){
                setSelectedImage((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }
        },3000)
        return ()=>clearInterval(interval)
    
    },[selectedImage])
    const handleChange = (index) => () => {
        setCurrentImageIndex(index);
    };
    const handleExport=()=>{
        const data=exportData;
          const resultString=data.images.join(', ');
          data.images=resultString;
        const dataArray = Object.keys(data).map(key => ({
        key: key,
        value: data[key]
        }));
        exportToExcel(dataArray,'catalogs');
      }
      const exportToExcel = (data, filename) => {
        const ws = XLSX.utils.json_to_sheet(data);
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
              XLSX.writeFile(wb, filename + ".xlsx");
      };
    return (
            <div className='w-full h-full flex flex-col justify-end items-end'>
            <h1 className='w-3/4 px-4 py-4 text-4xl text-blue-500'>Preview</h1>
            {<div className='w-3/4 h-full flex justify-center'>
            <div className='w-1/2 h-screen flex justify-center items-start pt-44'>
                <div className='w-3/4 h-1/2'>
                <div className='w-full h-full flex justify-center items-center'>
                    <img src={images[selectedImage]} alt={`Product Image ${selectedImage}`} className='w-full h-full' />
                </div>
                    <div className='w-full h-24 flex justify-center gap-8 items-center mt-10 border-2 rounded-lg'>
                      {
                        images.map((image, index) => (
                            <div key={index} className='w-20 h-20 inline-block'>
                                <img onClick={()=>(setSelectedImage(index))} src={image} alt={`Product Image ${index}`} className={`w-20 h-20 ${selectedImage===index?'border-2 border-blue-300':''}`} />
                            </div>
                        ))
                      }      
                    </div>
                </div>
            </div>
                <div className='w-1/2 h-full min-h-screen flex flex-col justify-center items-start'>
                    <h1 className='text-2xl my-2 mx-4'><span className='font-bold'>Product Name:</span> {title}</h1>
                    <h1 className='text-xl my-2 mx-4 '><span className='font-bold'>Category:</span> {category}</h1>
                    <h1 className='text-xl my-2 mx-4 '><span className='font-bold'>Subcategpry:</span> {subcategory}</h1>
                    <h1 className='text-xl my-2 mx-4'><span className='font-bold'>Price: INR</span> {price}</h1>
                    <h1 className='text-xl my-2 mx-4'><span className='font-bold'>Product Specifications:</span> {specifications}</h1>
                    <h1 className='text-xl my-2 mx-4'><span className='font-bold'>Product Description:</span> {description}</h1>
                    <div className='w-full h-fit flex justify-center'>

                    <button onClick={handleExport} className=" w-44 bg-blue-500 m-3 text-xl text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50 rounded-md px-5 py-2.5 text-center">Export</button>
                    </div>
                </div>
            </div>}
            </div>
    );
}

export default ViewCatalog;