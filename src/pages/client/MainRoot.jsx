import React from 'react'
import Footer from '../../components/Layout/Footer/Footer';
import Header from '../../components/Layout/Header/Header';
import { Outlet } from 'react-router-dom';
const MainRoot = () => {
  return (
    <div>
        {/* <Header/> */}
        <Outlet/>
         <Footer/>
    </div>
  )
}

export default MainRoot