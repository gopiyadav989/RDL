import React from 'react'
import './Loading.css'
function Loading() {
  return (
    <div className='w-fit h-fit bg-gray-400 relative'>
        <div className='w-14 h-14 border-2 rounded-full border-blue-500 absolute l1'></div>
        <div className='w-14 h-14 border-2 rounded-full border-gray-500 absolute l2'></div>
    </div>
  )
}

export default Loading