import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import ROLE from "../common/role"
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ onClose, role, name, email, userId, callFunc }) => {

    const [userRole, setUserRole] = useState(role)
    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
        // console.log(e.target.value)
    }

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })

        const responseDta = await fetchResponse.json()
        console.log("responseDta_update_user", responseDta)

        if(responseDta.success) {
            toast.success(responseDta.message)
            onClose()
            callFunc()
        }

        // console.log("role update", responseDta)
    }

    return (
        <div
            className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-600 bg-opacity-50'
        >
            {/* Modal box for updating the user role */}
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

                {/* Close button to close the modal */}
                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>

                {/* Modal title */}
                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>

                <p>Name : {name}</p>
                <p>Email : {email}</p>

                {/* Role selection dropdown */}
                <div className='flex items-center justify-between my-4'>
                    <p>Role :</p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>

                {/* Button to trigger the role update */}
                <button
                    className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700'
                    onClick={updateUserRole}
                >
                    Chang Role
                </button>
            </div>
        </div>
    )
}

export default ChangeUserRole