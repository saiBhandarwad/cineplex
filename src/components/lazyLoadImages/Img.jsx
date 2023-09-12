import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Img = ({src, className, directToDetailsPage, data , elem}) =>{
    return (
        <LazyLoadImage 
            className={className || ''}
            alt=''
            effect= 'blur'
            src={src}
            onClick={()=>directToDetailsPage(data, elem)}
        />
    )
}

export default Img;