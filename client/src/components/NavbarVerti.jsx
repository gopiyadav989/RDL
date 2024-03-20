import React from 'react';
import { FaHome } from "react-icons/fa";
import { BsGiftFill } from "react-icons/bs";
import { IoCallSharp } from "react-icons/io5";
import { BiSolidLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from 'react-router-dom';
import { MdCreateNewFolder } from "react-icons/md";
import logo from '../assets/lo.png'
import { FcAbout } from "react-icons/fc";
import { FaUserAlt } from "react-icons/fa";
function NavbarVreti({ children }) {
    const menuItems = [
        {
            path: "/",
            name: "Home",
            icon: <FaHome color='#2196f3' />
        },
        {
            path: "/about",
            name: "About",
            icon: <FcAbout size={20} />
        },
        {
            path: "/contact",
            name: "Contact",
            icon: <IoCallSharp color='#2196f3' />
        },
        {
            path: "/logout",
            name: "Logout",
            icon: <BiSolidLogOut color='#2196f3' />
        }
    ];

    return (
        <div className="">
            <div className="fixed left-0 top-0 h-full bg-slate-50 border-r-2 w-1/4 flex flex-col justify-between">
                <div className="p-4">
                    <div className='flex gap-4 mb-6'>
                        <img className='w-32 h-32 rounded-lg' src={logo}/>
                        <h1 className="flex items-center text-slate-600 text-4xl mb-4">CataglogMaker</h1>
                    </div>
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className="w-full h-fit flex items-center justify-start px-20 rounded-lg hover:bg-slate-100 cursor-pointer text-center p-4 text-2xl text-slate-500"
                        >
                            <div className="mr-2">{item.icon}</div>
                            <div className='text-slate-600'>{item.name}</div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NavbarVreti;