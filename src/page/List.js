import React, { useContext, useEffect, useState } from 'react'
import {FoodContext}from './Item'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
function List() {
  const {food}=useContext(FoodContext) ;
  const navigate = useNavigate(); // useNavigate 사용
  const [randomFood, setRandomFood] = useState([]);
  useEffect(() => {
    // food 배열을 복사하여 무작위로 섞음
    const shuffledFood = [...food].sort(() => 0.5 - Math.random());
    // 상위 10개의 무작위 음식을 선택
    const top10RandomFood = shuffledFood.slice(0, 10);
    setRandomFood(top10RandomFood);
  }, [food]);


  
  const handleRecipeClick = (recipeId) => {
    // 레시피 상세 페이지로 이동
    navigate(`/Detail/${recipeId}`);
  };
  return (
    <>
        <div className='random-food'>
          <h4>무작위 추천</h4>
        <Swiper 
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}">${index + 1}</span>`;
          },
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className={`mySwiper`}
        >
          <div className='random-img-up'>
            {randomFood.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div className='main_swiper_contents' onClick={() => handleRecipeClick(item.id)}>
                  <img src={item.image} alt={`Random Food ${index}`} />
                  <div className='Random-img-txt'>
                    <b> 
                    {item.title}
                    </b>
                    <p>
                      {item.readyInMinutes}min
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        </div>
    </>
  )
}

export default List