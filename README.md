# 개인 포트폴리오 두번째 ) New Cording : OMGfood

React.js를 사용하여 api를 연동해 제작하였습니다. 평소 요리를 잘 하지 못했던 제가 요리레시피를 보여주는 어플이 있으면 좋겠다고 생각하여 pwa를 적용해 만들었습니다.

api인 spooncular을 적용하여 제작하였습니다. spooncular의 api는 무료 한도 트래픽의 양이 적어서 일부 파일을 JSON으로 옮겨서 작업 한 부분도 있습니다.
검색, 랜덤레시피 등이 있습니다. 실제로 저는 이 어플을 보면서 요리를 하였습니다. ㅎㅎ

## 제작기간) 
 9월-10월

## 개발 환경) 
- `visual studio code`
- `HTML`
- `CSS`
- `JavaScript`
- `React.js`
- `spooncular api`
- `SCSS`
- `Github`
- `PWA`

## 페이지 구성)
메인페이지 무작위음식추천 검색 세계별대표음식 상세정보 

## 주요기능 

#### 메인페이지
* 자바스크립트로 기능 구현 및 스와이퍼 플러그인을 사용하여 제작
* 무작위 음식들을 추천해주고 검색 ,세계병 대표음식을 볼 수 있음
#### 무작위 음식 추천
* api로 받은 데이터를 제이슨으로 100개정도로 따로 만들어서 그 데이터를 바탕으로 무작위음식 10개를 보여줌
#### 검색
* 검색한 음식데이터가 나오고 클릭시 레시피 상세페이지로 이동
* 검색한데이터들은 스와이퍼를 사용하여 옆으로 넘김
#### 세계별대표음식
* api로 데이터를 받아서 각 나라별 음식들을 보여줌
* cuisine 이 키워드가 각 나라의 정보를 담고 있음

## 예시 코드(Detail page)
```
import React, { useState, useEffect } from 'react';
import Header from './Header'
import { useParams } from 'react-router-dom';
import axios from 'axios';
function Detail() {
    const { recipeId } = useParams();
    console.log(recipeId);
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [recipeNutritionWidget, setRecipeNutritionWidget] = useState(null);
    const [recipeEquipmentWidget, setRecipeEquipmentWidget] = useState(null);
    const [recipeIngredientsWidget, setRecipeIngredientsWidget] = useState(null);

    

    useEffect(() => {
      // 레시피 상세 정보를 가져오는 API 요청
      
    

      axios
        .all([
          //레시피상세정보
          axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.API_KEY1}`),
          //영양분석 시각화
          axios.get(`https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget?defaultCss=True&apiKey=${process.env.API_KEY2}`),
          // 필요한 장비
          axios.get(`https://api.spoonacular.com/recipes/${recipeId}/equipmentWidget?defaultCss=True&apiKey=${process.env.API_KEY3}`),
          //성분 분석
          axios.get(`https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget?defaultCss=True&measure=metric&apiKey=${process.env.API_KEY4}`),
        ])
        .then(axios.spread((response1,response2,response3,response4) => {
          setRecipeDetails(response1.data);
          console.log(response4);
          setRecipeNutritionWidget(response2);
          setRecipeEquipmentWidget(response3);
          setRecipeIngredientsWidget(response4);
        }))
        .catch((error) => {
          console.error(error);
        });
        
    }, [recipeId]);


  return (
    <main >
        <div className='main-containner'>
            <Header/>
            <div className='FoodInfo'>
            <h2>레시피 상세 정보</h2>
            {recipeDetails ? (
                <div className='FInfoContents'>
                  <h3>{recipeDetails.title}</h3>
                  <img src={recipeDetails.image} alt={recipeDetails.title} />
                  <div className='FInfoTxt'>
                    <p>요리 시간 : {recipeDetails.readyInMinutes} 분</p>
                    <p>서빙 : {recipeDetails.servings} 인분</p>
                  </div>
                  <div className='NutritionInfo'>
                    <h4>영양정보</h4>
                    <div dangerouslySetInnerHTML={{ __html: recipeNutritionWidget.data}} />
                  </div>
                  <div className='RequireEquip'>
                    <h4>필요 장비</h4>
                    <div dangerouslySetInnerHTML={{ __html: recipeEquipmentWidget.data}} />
                  </div>
                  <div className='Ingredients'>
                    <h4>필요 재료</h4>
                    <div dangerouslySetInnerHTML={{ __html: recipeIngredientsWidget.data }} />
                  </div>
                  <div className='Cooking'>
                    <h4>요리 방법</h4>
                    <div dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }} />
                  </div>
                  

                </div>
            ) : (
              <div id="load">
                <div>G</div>
                <div>N</div>
                <div>I</div>
                <div>D</div>
                <div>A</div>
                <div>O</div>
                <div>L</div>
              </div>
            )}
            </div>
        </div>
    </main>
  )
}

export default Detail
```
