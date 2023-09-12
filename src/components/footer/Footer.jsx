import React from 'react'
import './style.css'
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
export default function Footer() {
  
  return (
    <div className='container'>
      <div className="headList">
        <span>Terms Of Use</span>
        <span>Privacy-Policy</span>
        <span>About</span>
        <span>Blog</span>
        <span>FAQ</span>
      </div>
      <div className="description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique doloribus reprehenderit nemo possimus cum nisi, quos dicta officia iure vitae earum aperiam, qui atque veritatis distinctio nobis sint deleniti eius. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi, deserunt minima aperiam.
      </div>
      <div className='icons'>
           <FaFacebook/>
           <FaInstagram/>
           <FaTwitter/>
           <FaLinkedin/>
      </div>
    </div>
  )
}
