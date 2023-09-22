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
    const [recipeTasteWidget, setRecipeTasteWidget] = useState(null);

    

    useEffect(() => {
      // 레시피 상세 정보를 가져오는 API 요청
      
    

      axios
        .all([
          //레시피상세정보
          axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=e75a0c51a42b41b9b9a0c7f845048434`),
          //영양분석 시각화
          axios.get(`https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget?defaultCss=True&apiKey=4c38a3a9e2c64aa0a7f2cdd04e22a860`),
          // 필요한 장비
          axios.get(`https://api.spoonacular.com/recipes/${recipeId}/equipmentWidget?defaultCss=True&apiKey=4a799b85e9ea49c59fa9e2523778e512`),
          //맛에 평가
        ])
        .then(axios.spread((response1,response2,response3,response4) => {
          setRecipeDetails(response1.data);
          console.log(response4);
          setRecipeNutritionWidget(response2);
          setRecipeEquipmentWidget(response3);
          setRecipeTasteWidget(response4);
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