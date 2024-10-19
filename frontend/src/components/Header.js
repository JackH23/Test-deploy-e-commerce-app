import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaUser, FaShoppingCart } from "react-icons/fa"; // Use FaUser instead of FaRegCircleUser
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetail } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
    // !!! test to use state fist then get data in the state to render one by one 
    // const user = useSelector(state);

    const user = useSelector(state => state?.user?.user);
    // console.log("header user", user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const context = useContext(Context)
    const [menuDisplay, setMenuDisplay] = useState(false)
    const searchInput = useLocation();

    console.log("searchInput", searchInput)
    const URLSearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLSearch.getAll("q")
    const [search, setSearch] = useState(searchQuery)

    console.log("header add to cart product", context)

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            credentials: "include"
        })

        const data = await fetchData.json();

        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetail(null));
            navigate("/");
        }

        if (data.error) {
            toast.error(data.message)
        }
    }

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value)

        console.log("search", search)
        if (value) {
            navigate(`/search?q=${value}`)
        } else {
            navigate("/")
        }
    }

    return (
        <header className='h-16 bg-white fixed shadow-md w-full z-40'>
            <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                {/* logo */}
                <div>
                    <Link to={"/"}>
                        <Logo w={90} h={50} />
                    </Link>
                </div>

                {/* search */}
                <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                    <input
                        type='text'
                        placeholder='search product here...'
                        className='w-full outline-none'
                        onChange={handleSearch}
                        value={search}
                    />
                    <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                        <GrSearch />
                    </div>
                </div>

                {/* User and cart section */}
                <div className='flex items-center gap-7'>
                    <div className='relative flex justify-center'>
                        {user?._id && (
                            <div
                                className='text-3xl cursor-pointer flex justify-center'
                                onClick={() => setMenuDisplay(prev => !prev)}
                            >
                                {
                                    user?.profilePic ? (
                                        <img
                                            src={user?.profilePic}
                                            className='w-10 h-10 rounded-full'
                                            alt={user?.name}
                                        />
                                    ) : (
                                        <FaUser />
                                    )
                                }
                            </div>
                        )}
                    </div>

                    {/* Dropdown menu for user actions (visible only when menuDisplay is true) */}
                    {
                        menuDisplay && (
                            <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                                <nav>
                                    {
                                        user?.role === ROLE.ADMIN && (
                                            <Link
                                                to={"/admin-panel/all-products"}
                                                className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'
                                                onClick={() => setMenuDisplay(prev => !prev)}
                                            >
                                                Admin Panel
                                            </Link>
                                        )
                                    }
                                    <Link to={"/order"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Order</Link>
                                </nav>
                            </div>
                        )
                    }

                    {/* user cart */}
                    {
                        user?._id && (
                            <Link to={"/Cart"} className='text-2xl relative'>
                                <span><FaShoppingCart /></span>
                                {/* Badge showing the number of products in the cart */}
                                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                    <p className='text-sm'>{context?.cartProductCount}</p>
                                </div>
                            </Link>
                        )
                    }

                    <div>

                        <div>
                            {user?._id ? (
                                <button
                                    className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
