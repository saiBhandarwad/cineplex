import React, { Fragment, useEffect, useRef, useState } from 'react'
import Img from '../lazyLoadImages/Img'
import { useDispatch, useSelector } from 'react-redux'
import posterImg from '../../assets/Moviex-images/no-poster.png'
import './style.css'
import { HiOutlineArrowCircleLeft, HiOutlineArrowCircleRight } from 'react-icons/hi'
import CircleRating from '../circularRating/circularRating'
import { fetchDataFromApi } from '../../utils/api'
import { getGenres } from '../../redux/homeSlice'
import Genres from '../genres/Genres'
import { useNavigate } from 'react-router-dom'


export default function Carousel({ data, loading, selection }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [screenWidth,setScreenWidth] = useState(window.innerWidth)
    const scrollContainer = useRef()
    const { poster } = useSelector(state => state.home.url)
    const date = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const genreCategory = ['tv', 'movie']
    let universalScrollAmt = 0

    useEffect(()=>{
        let container = scrollContainer?.current
        container?.scrollTo({
            left: universalScrollAmt,
            behavior: "smooth",
        })
        universalScrollAmt = 0
    },[data])
   

    const scroll = (dir) => {
       
        let container = scrollContainer?.current
        const scrollAmount = dir === 'left' ? container?.scrollLeft - (container?.offsetWidth + 20) : container?.scrollLeft + (container?.offsetWidth + 20)
        if(dir === 'right'){
            universalScrollAmt+=scrollAmount
        }else{
            universalScrollAmt-=scrollAmount
        }
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }
    const skItem = () => {
        return <div className='skCarousel'>
            <div className="skImage"><div className="imageWave"></div></div>
            <div className="skTitle"><div className="titleWave"></div></div>
            <div className="skDate"><div className="dateWave"></div></div>
        </div>
    }
    const genresCall = async () => {
        let allGenres = {}
        let promises = []
        
        genreCategory.forEach(async (elem) => {
             
            promises.push(fetchDataFromApi(`/genre/${elem}/list`))
            
        })
        const data = await Promise.all(promises)
        data.map((elem) => {
            return elem.genres.map(item=>(allGenres[item.id]= item.name))
        })
        dispatch(getGenres(allGenres))
        
    }
    useEffect(() => {
        genresCall()
    }, [])

    const directToDetailsPage = (data, elem) =>{
        navigate(`/${data.elem?.media_type ? data.elem.media_type : data.selection}/${data.id}`,{state : {
            elem : elem
        }})
    }
    return (
        <>{!loading ? <div className='carousel'>
            <div className={screenWidth > 800 ?`leftArrow` : 'hideArrow'}>
                <HiOutlineArrowCircleLeft onClick={() => scroll('left')} />
            </div>
            
            <div className="carouselItems" ref={scrollContainer} >
                {data?.map((elem) => <div className='carouselItem' key={elem.id}>
                    {elem.original_title || elem.name ? <>
                        <Img src={elem.poster_path ? poster + elem.poster_path : posterImg} directToDetailsPage={directToDetailsPage} data={selection ? {selection,id:elem.id} : {elem,id:elem.id}} elem={elem}/> 
                       <div className="ratingGenre">
                       <CircleRating rating={elem.vote_average.toFixed(1)} />
                       <Genres data={elem.genre_ids}/>
                       </div>
                        <div className="title">{elem.original_title?.slice(0, 18) || elem.name?.slice(0, 18)} {elem.original_title?.length > 26 || elem.name?.length > 26 ? '...' : ''}</div>
                        {elem.release_date && <div className="date">{date[+elem.release_date?.slice(6, 7) - 1]} {elem.release_date?.slice(8, 10)}, {elem.release_date?.slice(0, 4)}</div>}
                    </> : ''}

                </div>
                )}
            </div>
            <div className={screenWidth > 800 ?`rightArrow` : 'hideArrow'}>
                <HiOutlineArrowCircleRight onClick={() => scroll('right')} />
            </div>
        </div> : <div className='carousel'>
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
        </div>}
        </>
    )
}
