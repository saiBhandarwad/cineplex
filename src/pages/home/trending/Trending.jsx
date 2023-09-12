import React, { Fragment, useState } from 'react'
import './style.css'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
import Popular from '../../../components/popular/popular'


export default function Trending() {

    const [selection, setSelection] = useState('day')

    const handleSelection = (data) => {
        setSelection(data)
    }
    const { data, loading } = useFetch(`/trending/all/${selection}`)
    return (
        <>
            <div className='trending'>
                <span>Trending</span>
                <div>
                    <span className={selection === 'day' ? 'day' : ''} onClick={() => handleSelection('day')}>Day</span>
                    <span className={selection === 'week' ? 'week' : ''} onClick={() => handleSelection('week')}>Week</span>
                </div>
            </div>
            
            <Carousel data={data?.results} loading={loading}/>
           
        </>
    )
}
