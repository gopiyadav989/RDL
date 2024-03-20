import { Link } from 'react-router-dom';
import { VscArrowRight } from "react-icons/vsc";
import { useSelector } from 'react-redux';
import logo from '../assets/lo.png'
function Navbar() {
    
    const {currentSeller} = useSelector(state => state.seller);

    return (
        <div className=' bg-slate-200 sticky top-0 left-0 w-full z-50'>
            <div className='container mx-auto flex justify-between items-center py-6 px-20'>
                <Link to={"/"} className='flex items-center'>
                    <img
                        src={logo}
                        alt="Logo"
                        className='h-14 w-14'
                    />
                    <h1 className='text-2xl font-extrabold ml-4 text-black'>catalogmaker</h1>
                </Link>
                {
                    currentSeller ? (
                        <Link to="/dashboard" >DashBoard</Link>
                    ) :  (
                        <div className='flex space-x-6 items-center'>
                            <Link to={"/sign-in"} className='text-xl font-bold hidden md:inline-block'>Signin</Link>
                            
                            <Link to={"/sign-up"} className='hidden md:flex bg-black hover:bg-black text-white w-44 text-left   px-7 py-3 rounded-lg items-center  justify-around cursor-pointer '>
                                <Link to={"/sign-up"} className=' text-md font-bold  font-nova-round '>Signup </Link>
                                <VscArrowRight size={20} />
                            </Link>
                        </div>
                    )
                }
                

            </div>
        </div>
    )
}

export default Navbar