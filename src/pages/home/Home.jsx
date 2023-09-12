import React from 'react'
import './style.scss'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from '../../components/popular/popular'
import TopRated from '../../components/top rated/TopRated'
import Footer from '../../components/footer/Footer'


export default function Home() {
  return (

    <div className='center'>
      <HeroBanner />
      <Trending/>
      <Popular/>
      <TopRated/>
      <Footer/>
    </div>

  )
}
