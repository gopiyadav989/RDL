// import {useSelector, useDispatch} from 'react-redux'
// import {useRef, useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';

// export default function Profile() {
//     const [showpass,setShowpass]=useState(false);


//     const handleSubmit = async (e)=>{
//         e.preventDefault();
//         try{
//           dispatch(updateUserStart());
//           const res = await fetch(`api/user/update/${currentUser._id}`,{
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//           })
//           const data = await res.json();
    
//           if(data.success === false){
//             dispatch(updateUserFailure(data.message));
//             return;
//           }
//           dispatch(updateUserSuccess(data));
//           setUpdateSucesss(true);
//         }
//         catch(e){
//           dispatch(updateUserFailure(e.message));
//         }
//       }

    
//   return (

    


//     <div className='w-full flex justify-end'>
//         <div className='w-3/4 h-screen flex justify-center items-center'>
//             <div className='w-12/5 h-1/2 bg-slate-100 rounded-lg border'>
//                 {/* <form className='w-full h-full flex flex-col items-start px-10 justify-center'>
//                     <h1 className='text-3xl mb-2 text-blue-500 text-center w-full'>User Info</h1>
//                     <label className='text-2xl'>Name:</label>
//                     <input type='text' className='w-96 h-16 mb-2 rounded-md'/>
//                     <label className='text-2xl'>Email:</label>
//                     <input type='email' className='w-96 h-16 mb-2 rounded-md'/>
//                     <label className='text-2xl'>Password:</label>
//                     <div className='flex'>
//                         <input type={showpass?'text':'password'} className='w-96 h-16 mb-2 rounded-md'/>
//                         <button className='w-fit h-16 text-xl bg-blue-500 text-white px-2 rounded-r-lg'>show</button>
//                     </div>
//                 </form> */}
//                       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
//         <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
//         <p className='text-sm self-center' >{fileUploadError ? <span className='text-red-700'>Error in uploading Image (image must be less than 2mb) </span> : filePerc >0 && filePerc <100 ? <span className='text-slate-700' >{`Uploading ${filePerc}%`}</span> : filePerc === 100 ? <span className='text-green-700'>Image successfully uploaded!</span> : ''}</p>
//         <input type="text" placeholder='username' defaultValue={currentUser.username} id='username' onChange={handleChange} className='border p-3 rounded-lg'/>
//         <input type="email" placeholder='email' defaultValue={currentUser.email} id='email' onChange={handleChange} className='border p-3 rounded-lg'/>
//         <input type="password" placeholder='password' id='password'  onChange={handleChange}className='border p-3 rounded-lg'/>
//         <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading....' : 'Update'}</button>
//         <Link className='bg-green-700 text-white p-3 text-center uppercase rounded-lg hover:opacity-95' to={'/create-listing'}>Create Listing</Link>
//       </form>
//             </div>
//         </div>
//     </div>
//   )
// }


import React from 'react'

export default function Profile() {
  return (
    <div>Profile</div>
  )
}

