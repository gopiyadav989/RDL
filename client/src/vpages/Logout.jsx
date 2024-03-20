import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { updateSellerStart, updateSellerSuccess, updateSellerFailure, deleteSellerFailure, deleteSellerStart, deleteSellerSuccess, signOutSellerStart, signOutSellerSuccess, signOutSellerFailure } from '../redux/seller/sellerSlice';



function LogoutPage() {

    const {currentSeller, loading, error} = useSelector((state)=> state.seller);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSignOut = async() => {
        try{
            const res = await fetch('/api/auth/signout');
            const data = await res.json();
            if(data.success === false){
                dispatch(signOutSellerFailure(data.message));
                return;
            }
            dispatch(signOutSellerSuccess());
            navigate("/");

        }
        catch{

        }
        // try{
        //   dispatch(signOutSellerStart());
        //   const res = await fetch('/api/auth/signout');
        //   const data = await res.json();
        //   if(data.success === false){
        //     dispatch(signOutSellerFailure(data.message));
        //     return;
        //   }
        //   dispatch(signOutSellerSuccess());
        // }
        // catch(e){
        //   dispatch(signOutSellerFailure());
        // }
      }
    


    return (
        <div className="flex justify-center items-center h-screen  bg-black">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform scale-95 hover:scale-100 transition duration-300">
                <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Goodbye!</h1>
                <p className="text-gray-600 mb-6">You're about to leave. Are you sure you want to log out?</p>
                <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Logout
                </button>
                <div className="mt-6 text-sm text-gray-500">Stay Connected: <Link to="/twitter" className="underline">Twitter</Link> | <Link to="/facebook" className="underline">Facebook</Link></div>
            </div>
        </div>
    );
}

export default LogoutPage;