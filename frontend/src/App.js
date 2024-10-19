import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SummaryApi from "./common/index"

import { ToastContainer } from 'react-toastify'; // Toast container for displaying notifications
import 'react-toastify/dist/ReactToastify.css'; // Importing toastify's CSS for notifications
import { useEffect, useState } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetail } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0) 

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include"
    });

    const dataApi = await dataResponse.json();
    console.log("AddToCart", dataApi)

    if (dataApi.success) {
      dispatch(setUserDetail(dataApi.data))
    }
  };

  const fetchUserAddToCart = async() => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include"
    });

    const dataApi = await dataResponse.json();
    console.log("AddToCart", dataApi);

    setCartProductCount(dataApi?.data?.count)

  }

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  },[])

  return (
    <Context.Provider value={{
      fetchUserDetails,
      fetchUserAddToCart,
      cartProductCount
    }}>

      <ToastContainer
        position='top-center'
      />

      <Header />

      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet />
      </main>

      <Footer />
    </Context.Provider>
  );
}

export default App;
