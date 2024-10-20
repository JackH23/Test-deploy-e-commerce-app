import React, { useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ROLE from '../common/role'

const AdminPanel = () => {

  const user = useSelector(state => state?.user?.user)
  // console.log("user-detail", user)

  // !!! back to backend = authToken > allUsers 
  // !!! to test console.log("userId",req.userId) that userId and token coming or not

  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/")
    }
  },[user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 customShadow' >
        {/* User profile section */}
        <div className='mt-4 h-32 flex justify-center items-center flex-col'>
          {/* User avatar */}
          <div className='text-5xl cursor-pointer relative flex justify-center'>
            {
              // Display profile picture if available, otherwise show a user icon
              user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className='w-20 h-20 rounded-full'
                  alt={user?.name}
                />
              ) : (
                <FaUser />
              )
            }
          </div>
          {/* User's name and role */}
          <p className='capitalize text-lg font-semibold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>

        {/* Navigation links for admin */}
        <div>
          <nav className='grid p-4'>
            <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
            <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All Products</Link>
            <Link to={"all-order"} className='px-2 py-1 hover:bg-slate-100'>All Orders</Link>
          </nav>
        </div>
      </aside>

      <main className='w-full h-full p-2'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminPanel

