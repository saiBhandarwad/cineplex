import React, { useEffect, useState } from 'react'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImages/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

export default function HeroBanner() {
  const [background, setBackground] = useState('')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { data, loading } = useFetch('/movie/upcoming')
  const { url } = useSelector(state => state.home)

  useEffect(() => {
    const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg)
  }, [data])


  const searchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)

    }
  }
  return (
    <>
      <div className="heroBanner">
        {!loading && <div className='backdropImg'>
          <img src={background} alt="" loading='lazy'/>
        </div>}
        <ContentWrapper>
          <div className='heroText'>
            <h1 className='heroHeading'>Welcome.</h1>
            <span>Millions of movies, TV shows and people to discover. Explore now.</span>
          </div>
          <div className='heroSearch'>
            <input type="text" className='heroInput'
              onKeyUp={(e) => searchQueryHandler(e)}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search for a movie or tv show....'
            />
            <button className='heroSearchBtn'>search</button>
            <div className="opacityLayer"></div>
          </div>
        </ContentWrapper>
      </div>
    </>
  )
}
