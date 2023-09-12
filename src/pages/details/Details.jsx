import React from 'react'
import './style.scss'
import useFetch from '../../hooks/useFetch'
import Img from '../../components/lazyLoadImages/Img'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import CircleRating from '../../components/circularRating/circularRating'
import dayjs from 'dayjs'

export default function Details() {
  const { genres, url } = useSelector(state => state.home)
  const location = useLocation()
  let elem = location.state.elem
  console.log({ elem });
  const { mediaType, id } = useParams()
  const { poster } = useSelector(state => state.home.url)
  const { data } = useFetch(`/${mediaType}/${id}`)
  return (<>
    
    
    <Img className='bgImage' src={ url.backdrop + data?.backdrop_path} />
    <div className="detailsContainer">
      <div className='details'>
        <Img className='opacity' src={data?.poster_path ? poster + data?.poster_path : data?.backdrop_path} />
        <div className="rightContainer">
          <div className='title'>{elem.original_title ? elem.original_title : elem.name} ({elem?.release_date ? elem?.release_date?.slice(0, 4) : elem?.first_air_date?.slice(0, 4)})</div>
          <div className='genreDetails'>{elem?.genre_ids?.slice(0, 2).map((g, i) => <div className='genreNameDetails' key={i}>{genres[g]}</div>)}</div>
          <div className="flex">
            <CircleRating rating={elem.vote_average.toFixed(1)} />
          </div>
          <div className="overView">
            <div className='headingOverview'>Overview</div>
            <div className="overviewText">{elem.overview}</div>
          </div>
          <div className="extras">
              <div className="status"><b>Status :</b> <span>Released</span></div>
              <div className="releaseDate"><b>Release Date :</b> <span>{dayjs(elem.release_date).format('MMM D,YYYY') || elem?.first_air_date}</span></div>
              <div className="runTime"><b>Runtime :</b> <span>1h 35m</span></div>
          </div>
          <hr />
          <div className="director">Director</div>
          <hr />
          <div className="writer">Writer</div>
          <hr />
        </div>
      </div>
    </div>

    </>
  )
}
