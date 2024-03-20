import { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';


export default function SignUp() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    
  };

  const handleSumbit = async (e)=> {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
        setError("Password not matching");
        return;
    }

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

      try{
        const res = await fetch('api/auth/signup',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        const data = await res.json();
        if(data.success == false){
          setError(data.message);

          return;
        }

        navigate('/sign-in')
      }catch(e){

        setError(e.message);
      }

  }


  return (
    <div className='p-4 max-w-lg mx-auto shadow-lg mt-7'>
      
      <h1 className='text-3xl text-center font-bold my-7 uppercase'>Sign Up</h1>

      <form onSubmit={handleSumbit}
        className='flex flex-col'> 

        <label >Full Name: </label>
        <input type="text" placeholder='Enter your Name here' id='fullName' 
          onChange={handleChange}
          className='border p-3 rounded-lg mb-7' />
        
        <label >Email: </label>
        <input type="email" placeholder='Enter your Email here' id='email' 
          onChange={handleChange}
          className='border p-3 rounded-lg mb-7' />

        <label >Password: </label>
        <input type="password" placeholder='Enter password' id='password' 
          onChange={handleChange}
          className='border p-3 rounded-lg mb-7' />

        <label >Confirm Password: </label>
        <input type="password" placeholder='Confirm Your password' id='confirmPassword' 
          onChange={handleChange}
          className='border p-3 rounded-lg mb-7' />

        <button disabled={loading}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mb-7'>{loading ? 'Loading....' : 'Sign Up'}</button>
         {/* <OAuth /> */  }
      </form>

      <hr className='border-gray-300 w-full my-auto' /> {/* Horizontal line */}

      <div className='flex gap-2 mt-7'>
        <p>Already have an account?</p>
        
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>

      

      {error && <p className='text-red-500 mt-5'>{error}</p> }
    </div>
  )
}
