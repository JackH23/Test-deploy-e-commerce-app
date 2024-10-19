import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from "react-toastify"
import moment from 'moment' // Library to format dates
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {

  const [allUser, setAllUsers] = useState([])

  const [openUpdateRole, setOpenUpdateRole] = useState(false)

  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  })

  const fetchAllUser = async () => {
    const fetchData = await fetch(SummaryApi.allUsers.url, {
      method: SummaryApi.allUsers.method,
      credentials: "include"
    })

    const dataResponse = await fetchData.json()
    console.log("AllUser", dataResponse)

    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }
  }

  useEffect(() => {
    fetchAllUser()
  }, [])

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUser.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td> {/* Serial number */}
                  <td>{el?.name}</td> {/* User name */}
                  <td>{el?.email}</td> {/* User email */}
                  <td>{el?.role}</td> {/* User role */}
                  <td>{moment(el?.createdAt).format('LL')}</td> {/* Formatted creation date */}
                  <td>
                    {/* Edit button to trigger the update role modal */}
                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                      onClick={() => {
                        // When clicked, set the current user details and open the modal
                        setUpdateUserDetails(el)
                        setOpenUpdateRole(true)
                      }}
                    >
                      <MdModeEdit /> {/* Edit icon */}
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {/* Modal component to change the user's role */}
      {
        openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            role={updateUserDetails.role}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            userId={updateUserDetails._id}
            callFunc={fetchAllUser}
          />
        )
      }

    </div>
  )
}

export default AllUsers