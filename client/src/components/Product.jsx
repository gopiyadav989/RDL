import { useEffect, useState } from 'react';

import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";




export default function Product({listing,setDel}) {

    const handleEdit = async()=> {

    }

    const handleDelete = async(listingId)=> {
        try{
            const res = await fetch(`/api/listing/delete/${listingId}`,{
              method: 'DELETE'
            })
            const data = await res.json();

            if(data.success === false){
              console.log(data.message);
              return;
            }
            setDel((p)=>!p);
          }
          catch(e){
            console.log(e.message);
          }
    }




  return (
    <div className="bg-white p-2 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
        <Link to={`/preview/${listing._id}`}>

          <img className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" src={listing.images[0]} alt={"listing cover"} />
          <div className="p-3 flex flex-col gap-2 w-full">
            <p className="truncate text-lg font-semibold text-slate-700">{listing.title}</p>
            <p className="text-sm text-green-600 line-clamp-2">INR {listing.price}</p>
          </div>

        </Link>
        <div className='w-full flex justify-end gap-4'>
                <Link to={`/preview/${listing._id}`}  className= " w-1/2 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ">View</Link>
                <button   className= " w-1/2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 " onClick={()=> handleDelete(listing._id)}>Delete</button>
        </div>
        
      </div>
  )
}
