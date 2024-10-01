import React, {useEffect} from 'react'
import '../Home/home.css'
import Banner from '../../../components/Banner/Banner'
import MainComponents from '../../../components/MainComponents/MainComponents'
import Client from '../../../components/Client/Client'
import Gallery from '../../../components/Gallery/Gallery'
import LastSection from '../../../components/LastSection/LastSection'
import Instagram from '../../../components/Instagram/Instagram'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
      <>
      <Banner />
      <MainComponents />
      <Gallery />
      <Client />
      <LastSection/>
      <Instagram/>
      </>
  )
}

export default Home