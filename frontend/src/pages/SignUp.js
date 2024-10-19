import React, { useState } from 'react'
import loginIcon from "../assest/signin.gif"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigate = useNavigate();

  // State to manage the form data including profile picture
  const [data, setData] = useState({
    email: "", // Initial state for email input
    password: "", // Initial state for password input
    name: "", // Initial state for name input
    confirmPassword: "", // Initial state for confirm password input
    profilePic: "", // Initial state for profile picture (empty string means no picture)
  })

  console.log("data", data)

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmitPic = async (e) => {
    const file = e.target.files[0];
    // !! console.log("file",file)

    const imagePic = await imageTobase64(file)
    // !! console.log("imagePic", imagePic)

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic
      }
    })
  }

  // Handler function to manage form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (data.password === data.confirmPassword) { // Checking if password and confirm password match

      // !! console.log("SummaryApi.signUP.url",SummaryApi.signUP.url)

      // Sending a POST request to the sign-up API
      const dataResponse = await fetch(SummaryApi.SignUp.url, {
        method: SummaryApi.SignUp.method, // Method is POST (as defined in the API)
        headers: {
          "content-type": "application/json" // Content type is JSON
        },
        body: JSON.stringify(data) // Sending form data (email, password, etc.) as JSON
      })

      // !! console.log("SummaryApi.signUP.url", SummaryApi.signUP.url)

      const dataApi = await dataResponse.json(); // Parsing the response from the API

      // console.log("dataApi", dataApi)

      if (dataApi.success) { // If signup is successful
        toast.success(dataApi.message); // Show success message
        navigate("/login"); // Navigate to the login page
      }

      if (dataApi.error) { // If signup fails
        toast.error(dataApi.message); // Show error message
      }

    } else {
      toast.error("Please check password and confirm password"); // Show error if passwords don't match
    }
  }

  console.log("data login", data)

  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>

          {/* Profile picture upload area */}
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || loginIcon} alt='login icons' />
            </div>
            <form>
              <label>
                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input type='file' className='hidden' onChange={handleSubmitPic} />
              </label>
            </form>
          </div>

          {/* Form starts here */}
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            {/* Name input */}
            <div className='grid'>
              <label>Name :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  placeholder='enter your name'
                  name='name'
                  value={data.name} // Binding input value to state
                  onChange={handleOnChange} // Handling changes in the input field
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            {/* Email input */}
            <div className='grid'>
              <label>Email : </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='enter your email'
                  name='email'
                  value={data.email} // Binding input value to state
                  onChange={handleOnChange} // Handling changes in the input field
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            {/* Password input */}
            <div className='grid'>
              <label>Password : </label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='enter your name'
                  name='password'
                  value={data.password} // Binding input value to state
                  onChange={handleOnChange} // Handling changes in the input field
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                  <span>
                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show eye/eye-slash icon based on the state */}
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm Password input */}
            <div>
              <label>Confirm Password : </label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='enter your name'
                  name='confirmPassword'
                  value={data.confirmPassword} // Binding input value to state
                  onChange={handleOnChange} // Handling changes in the input field
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Show eye/eye-slash icon based on the state */}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
            >
              Sig Up
            </button>
          </form>

          {/* Link to login page if the user already has an account */}
          <p className='my-5'>
            Already have an account ? {" "}
            <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignUp