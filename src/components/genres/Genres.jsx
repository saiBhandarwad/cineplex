import React, { useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux'

export default function Genres({ data }) {
    const { genres } = useSelector(state => state.home)
    let split = false
    return (
        <div className='genre'>
            {data?.map((genreId, index, arr1) => {
                return <div key={index}>{genres[genreId]?.includes('&') && index < 2 ? genres[genreId].split('&').map((elem, i, arr2) => {
                    split = true
                    if (index > 0 && arr2.length > 1) {
                        return null
                    }
                    return <div className="genreName" key={i}>{elem}</div> 
                }) : arr1.includes(genreId) && index < 2 && !split ? <div className="genreName" key={index}>{ genres[genreId]}</div>: null }
                </div>
            })}
        </div>
    )
}
