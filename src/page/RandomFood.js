import React, { useContext, useState,useEffect  } from 'react'
import {FoodContext}from './Item'
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import RF from '../picture/Refresh.png';
function RandomFood() {
  const {Rfood}=useContext(FoodContext) ;
  const navigate = useNavigate(); // useNavigate 사용

  const [randomFood, setRandomFood] = useState([]);

  useEffect(() => {
    // food 배열을 복사하여 무작위로 섞음
    const shuffledFood = [...Rfood].sort(() => 0.5 - Math.random());
    // 상위 10개의 무작위 음식을 선택
    const top10RandomFood = shuffledFood.slice(0, 10);
    setRandomFood(top10RandomFood);
  }, [Rfood]);

  const refreshRandomFood = () => {
    // "Refresh" 아이콘을 클릭할 때 무작위 음식 다시 불러오기
    const shuffledFood = [...Rfood].sort(() => 0.5 - Math.random());
    const top10RandomFood = shuffledFood.slice(0, 10);
    setRandomFood(top10RandomFood);
  };

  // 레시피 상세 페이지로 이동
  const handleRecipeClick = (recipeId) => {
    navigate(`/Detail/${recipeId}`);
  };
  
  return (
    <main>
      <div className='main-containner'>
        <Header/>
          <div className='random-food'>
            <h4>무작위 추천 </h4>
            <img src={RF} className='anima' onClick={refreshRandomFood}/>
            
            <div className='random-img-up Imglist'>
              {randomFood.map((item, index) => (
                  <p className='main_swiper_contents main_swipercontents' onClick={() => handleRecipeClick(item.id)}>
                    <img src={item.image} alt={`Random Food ${index}`} />
                    <div className='rit'>
                      <b> 
                        {item.title}
                      </b>
                      <p>
                        {item.readyInMinutes}min
                      </p>
                    </div>
                  </p>
              ))}
            </div>
          </div>
      </div>
    </main>
  )
}

export default RandomFood


/* 
{selectedFood && (
  <div className='random-img-up Imglist'>
    <p
      className='main_swiper_contents main_swipercontents'
      onClick={() => handleRecipeClick(selectedFood.id)}
    >
      <img src={selectedFood.image} alt={`Random Food`} />
      <div className='rit'>
        <b>{selectedFood.title}</b>
        <p>{selectedFood.readyInMinutes}min</p>
      </div>
    </p>
  </div>
)}
 */