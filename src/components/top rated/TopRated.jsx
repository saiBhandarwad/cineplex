import React, { Fragment, useState } from 'react'
import './style.css'
import useFetch from '../../hooks/useFetch'
import Carousel from '../carousel/Carousel'


export default function TopRated() {

    const [selection, setSelection] = useState('movie')

    const handleSelection = (data) => {
        setSelection(data)
    }
    const { data, loading } = useFetch(`/${selection}/top_rated`)
    return (
        <>
            <div className='popular'>
                <span>Top Rated</span>
                <div>
                    <span className={selection === 'movie' ? 'movie' : ''} onClick={() => handleSelection('movie')}>Movie</span>
                    <span className={selection === 'tv' ? 'tv' : ''} onClick={() => handleSelection('tv')}>TV Shows</span>
                </div>
            </div>
            
            <Carousel data={data?.results} loading={loading} selection={selection}/>
           
        </>
    )
}
