import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom'
import logo from '../picture/OMGlogo.png';
import hm from '../picture/icon_home_.png';
import rc from '../picture/randomfood.png';
import earth from '../picture/Earth.png';
import Search from './Search';
import axios from 'axios';
 function Header() {
    
  const [translatedText, setTranslatedText] = useState('');
  const apiKey = 'YOUR_PAPAGO_API_KEY'; // 발급받은 API 키로 대체

  useEffect(() => {
    // 페이지에서 텍스트 추출 및 번역
    const pageText = '여기에 페이지에서 추출한 텍스트를 할당';

    axios
      .post(
        'https://openapi.naver.com/v1/papago/n2mt',
        { source: 'ko', target: 'en', text: pageText },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Naver-Client-Id': apiKey,
            'X-Naver-Client-Secret': apiKey,
          },
        }
      )
      .then((response) => {
        const translated = response.data.message.result.translatedText;
        setTranslatedText(translated);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [apiKey]);

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