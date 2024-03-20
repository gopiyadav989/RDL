import React from 'react'
import { VscArrowRight } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import video from './vedio.mp4'


function Home() {
    return (
        <div className='bg-black h-[872px] text-white relative'>
            <div className='w-full h-full absolute'>
                <div className='w-full h-full relative'>
                    <video autoplay loop  className='w-full h-full absolute' src={video}/>
                    <div className='w-full h-full bg-black/60 absolute'></div>
                </div>
            </div>
            <div className='w-full h-full flex flex-col justify-center items-center absolute'>

            <div className='text-center mb-8 '>
                <h2 className=' font-bold  text-6xl'>
                    Smart Catalog You Should Make Everyday: professional, editable shareable, and faster
                </h2>
                <h4 className='text-2xl mt-10'>
                    Catalogmaker helps you create free online catalogs. Create dazzling PDF catalogs that include a complete list of items.
                </h4>
            </div>
            <div>
                <div className='flex bg-white hover:opacity-80 text-black w-58 text-left px-4 py-3 rounded-lg items-center justify-between cursor-pointer'>
                    <Link to={"/sign-up"} className='text-lg font-bold font-nova-round'>Signup for free</Link>
                    <VscArrowRight size={20} />
                </div>
            </div>
            </div>
        </div >
        
    )
}

export default Home