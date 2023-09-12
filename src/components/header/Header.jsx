import React, { useEffect, useState } from 'react'
import './style.css'
import { HiOutlineSearch } from 'react-icons/hi'
import { MdClose, MdMenu } from 'react-icons/md';


export default function Header() {

  const [show, setShow] = useState('')
  const [showMobileMenu, setShowMobileMenu] = useState('hideMobileMenu')
  const [showSearchBar, setShowSearchBar] = useState('hideSearchBar')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [mdScreen, setMdScreen] = useState(window.innerWidth)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = () => {
    if (showMobileMenu === 'showMobileMenu' || showSearchBar === 'showSearchBar') {
        setShow('show')
    } else {
      if (window.scrollY < 200) {
        setShow('')
      }
      else if (window.scrollY > lastScrollY) {
        setLastScrollY(window.scrollY);
        if (window.scrollY > 200) {
          setShow('hide')
        } else {
          setShow('')
        }
      } else {
        setShow('show')
      }
    }

  }

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu)
    setShowSearchBar('hideSearchBar')
    if (showMobileMenu === 'hideMobileMenu') {
      setShowMobileMenu('showMobileMenu')
      setShow('show')
    } else {
      setShowMobileMenu('hideMobileMenu')
      setShow('')
    }
  }

  const handleSearchBar = () => {
    setMobileMenu(false)
    setShow('')
    setShowMobileMenu('hideMobileMenu')
    if (showSearchBar === 'hideSearchBar') {
      setShowSearchBar('showSearchBar')
    } else {
      setShowSearchBar('hideSearchBar')
    }
  }
  const handleMdClose = () => {
    setShowSearchBar('hideSearchBar')
    setMobileMenu(false)
    setShow('')
  }
  document.addEventListener('scroll', handleScroll)

  return (
    <div className={`header ${show}`}>
      <div className='nav'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwWTRH4c50TLs3tDs2BwGU6hH9bjgR0Qw0GQ&usqp=CAU' alt="" className='logo' />

        {mdScreen < 800 ? <span>
          <span className='menuItem'><HiOutlineSearch onClick={handleSearchBar} className='searchBtn'/></span>
          {mobileMenu ? <MdClose onClick={() => handleMobileMenu()} className='menuBtn'/> : <MdMenu onClick={() => handleMobileMenu()} className='menuBtn'/>}</span> : <div className='menu'>
          <span className='menuItem'>Movies</span>
          <span className='menuItem'>TV Shows</span>
          <span className='menuItem'><HiOutlineSearch onClick={handleSearchBar} /></span>
        </div>}
      </div>

      <div className={` mobileMenu ${showMobileMenu}`}>
        <div className='menuItem'>Movies</div>
        <div className='menuItem'>TV Shows</div>
      </div>
      <div className={`searchBar ${showSearchBar}`}>
        <input type="text" placeholder='Search for a movie or tv show....' />
        <MdClose onClick={handleMdClose} color='black' style={{ cursor: "pointer" }} />
      </div>
    </div>

  )
}
