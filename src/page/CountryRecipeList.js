import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import AmericanFoodData from '../JSON/American_Food.json';
import KoreanFoodData from '../JSON/Korean_Food.json';
import ChineseFoodData from '../JSON/Chinese_Food.json';
import JapaneseFoodData from '../JSON/Japanese_Food.json';
import ItalianFoodData from '../JSON/Italian_Food.json';
import MexicanFoodData from '../JSON/Mexican_Food.json';
import FrenchFoodData from '../JSON/French_Food.json';
import SpanishFoodData from '../JSON/Spanish_Food.json';
import GreekFoodData from '../JSON/Greek_Food.json';
import Header from './Header';

const cuisines = [
  {
    name: '한식',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8JUVEJTk1JTlDJUVDJThCJTlEfGVufDB8fDB8fHww&auto=format&fit=crop&w=768&q=60', // 한식 이미지 URL
    cuisine: 'Korean', // API 요청에 사용할 요리 항목
    recipes: KoreanFoodData.results
  },
  {
    name: '중식',
    image: 'https://images.unsplash.com/photo-1517499414974-3b42addf2d86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmElMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=768&q=60', // 중식 이미지 URL
    cuisine: 'Chinese',
    recipes: ChineseFoodData.results
  },
  {
    name: '일식',
    image: 'https://images.unsplash.com/photo-1553944384-ffdc4fd8f2fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNoaW5hJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=768&q=60', // 일식 이미지 URL
    cuisine: 'Japanese',
    recipes: JapaneseFoodData.results
  },
  {
    name: '미국',
    image: 'https://plus.unsplash.com/premium_photo-1684373065883-3bc108c245b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8JUVCJUFGJUI4JUVBJUI1JUFEJTIwJUVDJTlEJThDJUVDJThCJTlEfGVufDB8fDB8fHww&auto=format&fit=crop&w=768&q=60',
    cuisine: 'American',
    recipes: AmericanFoodData.results
  },
  {
    name: '이탈리아',
    image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUVDJTlEJUI0JUVEJTgzJTg4JUVCJUE2JUFDJUVDJTk1JTg0JTIwJUVDJTlEJThDJUVDJThCJTlEfGVufDB8fDB8fHww&auto=format&fit=crop&w=768&q=60',
    cuisine: 'Italian',
    recipes: ItalianFoodData.results
  },
  {
    name: '멕시코',
    image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8JUVCJUE5JTk1JUVDJThCJTlDJUVDJUJEJTk0JTIwJUVDJTlEJThDJUVDJThCJTlEfGVufDB8fDB8fHww&auto=format&fit=crop&w=768&q=60',
    cuisine: 'Mexican',
    recipes: MexicanFoodData.results
  },
  {
    name: '프랑스',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUVEJTk0JTg0JUVCJTlFJTkxJUVDJThBJUE0JTIwJUVDJTlEJThDJUVDJThCJTlEfGVufDB8fDB8fHww&auto=format&fit=crop&w=768&q=60',
    cuisine: 'French',
    recipes: FrenchFoodData.results
  },
  {
    name: '스페인',
    image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JUVDJThBJUE0JUVEJThFJTk4JUVDJTlEJUI4JTIwJUVDJTlEJThDJUVDJThCJTlEfGVufDB8fDB8fHww&auto=format&fit=crop&w=768&q=60',
    cuisine: 'Spanish',
    recipes: SpanishFoodData.results
  },
  {
    name: '그리스',
    image: 'https://images.unsplash.com/photo-1554998171-89445e31c52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8JUVBJUI3JUI4JUVCJUE2JUFDJUVDJThBJUE0JTIwJUVDJTlEJThDJUVDJThCJTlEfGVufDB8fDB8fHww&auto=format&fit=crop&w=768&q=60',
    cuisine: 'Greek',
    recipes: GreekFoodData.results
  },
  // 다른 요리 항목도 추가할 수 있습니다.
];

function RecipeList() {
    const [selectedCuisine, setSelectedCuisine] = useState(null);
    const [recipes, setRecipes] = useState([]);
    console.log(recipes)
    const navigate = useNavigate(); // useNavigate 사용
    console.log(selectedCuisine)
   
  
    const handleFoodClick = (cuisine) => {
      // 이미 선택된 음식인 경우 토글
      if (selectedCuisine === cuisine) {
        setSelectedCuisine(null);
      } else {
        setSelectedCuisine(cuisine);
      }
    };
  
    const handleRecipeClick = (recipeId) => {
      // 레시피 상세 페이지로 이동
      navigate(`/Detail/${recipeId}`);
    };
  
    return (
      <main>
        <div className='main-containner'>
          <Header/>
        <div className='Recipe_list1'>
          <h4>대표 나라별 레시피</h4>
          <div className="cuisine-images1 Personal-cuisine">
            {cuisines.map((cuisine) => (
              <div className={`con_food1${selectedCuisine === cuisine ? 'cuisine-image-large' : ''}`} key={cuisine.name}>
                <img
                        src={cuisine.image}
                        alt={cuisine.name}
                        onClick={() => handleFoodClick(cuisine)}
                      />
                <b>{cuisine.name} 음식 목록</b>
                {selectedCuisine === cuisine && cuisine.recipes && ( // 선택된 음식일 때만 표시
                <ul>
                  {cuisine.recipes.map((food) => (
                    <li className='foodlist' key={food.id}>
                      <img src={`https://spoonacular.com/recipeImages/${food.image}`} alt={food.title} className='foodimg' onClick={() => handleRecipeClick(food.id)}/>
                      <h3>{food.title}</h3>
                      <p>Servings: {food.servings}</p>
                      <p>Ready in Minutes: {food.readyInMinutes}</p>
                    </li>
                  ))}
                </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
    );
  }
export default RecipeList;
/*  useEffect(() => {
      
      if (selectedCuisine) {
        axios
          .get(
            `https://api.spoonacular.com/recipes/search?cuisine=${selectedCuisine.cuisine}&number=10&apiKey=57ab8d0aae9e4598a7d77ae876505b6d`
          )
          .then((response) => {
            setRecipes(response.data.results);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [selectedCuisine]); */
/* 
{cuisines.map((cuisine) => (
                <div className='con_food' key={cuisine.cuisine}>
                    <img
                      src={cuisine.image}
                      alt={cuisine.name}
                      onClick={() => handleFoodClick(cuisine)}
                    />
                    <b>{cuisine.name}</b>
                </div>
              ))}
              {selectedCuisine && (
                <div className='FoodInfo'>
                    <h4>대표 음식들</h4>
                    <img src={selectedCuisine.image} alt={`${selectedCuisine.name} 음식`} />
                    <ul className='FoodInfoContents'>
                    {recipes.map((recipe) => (
                        <li key={recipe.id} onClick={() => handleRecipeClick(recipe.id)}>
                          <div className='FoodByCountry'>
                            <img src={`https://spoonacular.com/recipeImages/${recipe.image}`}/>
                            <a>{recipe.title}</a>
                          </div>
                        </li>
                    ))}
                    </ul>
                </div>
                )}
              
*/