import React, { useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { Link } from 'react-router-dom';


function Contactus() {
    const[message,setMessage]=useState('');
    const[subject,setSubject]=useState('');
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Contact</h1>
                <div className="mb-6">
                    <p className="text-gray-600">If you have any problem or issue, please reach out to us by filling out the form below.</p>
                </div>
                <div className="mb-4">
                    <input onChange={(e)=>setSubject(e.target.value)}
                        type="text"
                        placeholder="Subject"
                        className="w-full h-12 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <textarea onChange={(e)=>setMessage(e.target.value)}
                        placeholder="Message"
                        className="w-full  h-40 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    ></textarea>
                </div>
                <div>
                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 text-xl rounded flex justify-between">
                        Send
                        <div>
                            <IoIosSend size={25} />
                        </div>

                    </button> */}
                    <Link to={`mailto:gopyd@gmail.com?subject=${subject} website &body=${message}`} className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>
            Send Message
            </Link>
                </div>
            </div>
        </div>
    );
}

export default Contactus;