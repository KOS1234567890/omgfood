import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import logo from '../picture/OMGlogo.png';
import hm from '../picture/icon_home_.png';
import rc from '../picture/randomfood.png';
import earth from '../picture/Earth.png';
import Search from './Search';

 function Header() {
    
  return (
    <>
        <header>
            <div className='menubar'>
                <Link to='/'><img src={logo} alt='OMG Logo'/></Link>
                <div className='menu_right'>
                  <Link to='/'><img src={hm} alt='OMG home' id='home_ic'/></Link>
                  <Link to='/RandomFood'><img src={rc} alt='OMG recipes' id='recipes_ic'/></Link>
                  <Link to='/CountryRecipeList'><img src={earth} alt='OMG Earth' id='earth_ic'/></Link>
                </div>
            </div>
            <Search/>
        </header>
    </>
  )
}
export default Header