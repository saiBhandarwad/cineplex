import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { fetchDataFromApi } from './utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration, getGenres } from './redux/homeSlice'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/NotFound'

function App() {
  const dispatch = useDispatch()

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then(res => {
        console.log(res);
        const url = {
          backdrop : res.images.secure_base_url + 'original',
          poster : res.images.secure_base_url + 'original',
          profile : res.images.secure_base_url + 'original',
        }
        dispatch(getApiConfiguration(url))
      })
      .catch(err => {
        console.log({ err });
      })
  }

  useEffect(() => {
    fetchApiConfig()
  }, [])
  return (

    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:mediaType/:id' element={<Details/>}/>
        <Route path='/search/:query' element={<SearchResult/>}/>
        <Route path='/explore/:mediaType' element={<Explore/>}/>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>

    </BrowserRouter>

  )
}

export default App
