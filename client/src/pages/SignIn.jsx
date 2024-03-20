import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/seller/sellerSlice';

// import OAuth from "../components/OAuth";

export default function SignIn() {

  const [formData, setFormData] = useState({});

  const { loading, error } = useSelector((state) => state.seller);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    
  };

  const handleSumbit = async (e)=> {

    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Fill all values"));
      return;
    }

    try{
      dispatch(signInStart());
      const res = await fetch('api/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success == false){
        dispatch(signInFailure(data.message));
        return;
      }
      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/')
    }catch(error){
      dispatch(signInFailure(error.message));
    }

  }




  return (
    <div className='p-4 max-w-lg mx-auto shadow-lg mt-7'>
      
      <h1 className='text-3xl text-center font-bold my-7 uppercase'>Sign In</h1>

      <form onSubmit={handleSumbit}
        className='flex flex-col'> 
        
        <label >Email: </label>
        <input type="email" placeholder='Enter your Email here' id='email' 
          onChange={handleChange}
          className='border p-3 rounded-lg mb-7' />

        <label >Password: </label>
        <input type="password" placeholder='password' id='password' 
          onChange={handleChange}
          className='border p-3 rounded-lg mb-7' />

        <button 
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mb-7'>{'Sign In'}</button>
        {/* <OAuth /> */  } 
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>

      {/* {error && <p className='text-red-500 mt-5'>{error}</p> } */}
    </div>
  )
}
