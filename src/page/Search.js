import React, { useContext, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

function Search() {
    console.log( );
  const [searchFood, setsearchFood] = useState('');
  const [isActive, setIsActive] = useState(false); // isActive 상태 추가
  const [searchFoodResults, setsearchFoodResults] = useState([]);
  const navigate = useNavigate(); // useNavigate 사용
  //20까지의 랜덤 수 생성 
  const random09 = Math.floor(Math.random() * 20);
  
    const omgfoodSearch = ()=>{
        axios
        .get(`https://api.spoonacular.com/food/search?query=${searchFood}&number=${random09}&apiKey=4a799b85e9ea49c59fa9e2523778e512`)
        .then((response)=>{
            setsearchFoodResults(response.data.searchResults[0].results);
        })
        .catch((error)=>{
            console.error(error);
        })
    };
    const omgfoodInputChange = (e)=>{
        setsearchFood(e.target.value);
    }
    const handleOnKeyDown = e => {
        if (e.key === 'Enter') {
            omgfoodSearch(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };
    const handleRecipeClick = (recipeId) => {
        // 레시피 상세 페이지로 이동
        navigate(`/Detail/${recipeId}`);
      };
    
  return (
    <>
        <div className={`main-search ${isActive ? 'active' : ''}`} /* ref={element} */>
            <input
                type='text'
                placeholder='Apple,banana,cow...'
                value={searchFood}
                onChange={omgfoodInputChange}
                onKeyDown={handleOnKeyDown} // Enter 입력 이벤트 함수
            />
            <button className='searchbtn' onClick={omgfoodSearch}></button>
        </div>
        <Swiper 
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className={`mySwiper`}
        >
            <div className='main-contents'>
                {searchFoodResults.map((a,index)=>(
                    
                    <SwiperSlide key={index}>
                        <div className='main-food' key={index} >
                            <div className='dududungjang'>{random09==0 ? '더이상 제공해줄 정보는 없습니다' : '' }</div> 
                            <h2>{a.name}</h2>
                            <div className='search-food' onClick={() => handleRecipeClick(a.id)}>
                                <img src={a.image}></img>
                                <div className='search-food-txtbox' dangerouslySetInnerHTML={{__html: a.content}} >
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </div>
        </Swiper>
    </>
  )
}

export default Search


