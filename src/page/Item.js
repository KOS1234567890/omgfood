import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import RandomFood from '../JSON/Random_Recipe(300).json';
export const FoodContext = createContext();

function Item({ children }) {
  const [food, setFood] = useState([]); // food를 배열로 설정
  const [Rfood, setRfood] = useState([]); // Rfood를 배열로 설정

  const foodData1 = RandomFood.recipes;
    
  useEffect(() => {
    setFood(foodData1);
    setRfood(foodData1);
    }, []);

  return (
    <FoodContext.Provider value={{food,Rfood }}>
      {children}
    </FoodContext.Provider>
  );
}

export default Item;

/* 
// 새로운 음식 데이터를 가져오는 함수
  async function fetchNewFood() {
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/random?number=1&apiKey=4c38a3a9e2c64aa0a7f2cdd04e22a860');
      const foodData = response.data.recipes;
      setFood(foodData);
    } catch (error) {
      console.error(error);
    }
  }

  // 새로운 무작위 추천 음식 데이터를 가져오는 함수
  async function fetchNewRandomFood() {
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/random?number=2&apiKey=4a799b85e9ea49c59fa9e2523778e512');
      const foodData = response.data.recipes;
      setRfood(foodData);
    } catch (error) {
      console.error(error);
    }
  }
async function getFood() {
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/random?number=5&apiKey=e75a0c51a42b41b9b9a0c7f845048434');
      const response1 = await axios.get('https://api.spoonacular.com/recipes/random?number=2&apiKey=e75a0c51a42b41b9b9a0c7f845048434');
      const foodData = response.data.recipes; // 가져온 데이터
      const foodData1 = response1.data.recipes; // 가져온 데이터
      console.log(foodData);
      setFood(foodData); // 가져온 데이터를 배열로 설정
      setRfood(foodData1); // 가져온 데이터를 배열로 설정
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getFood();
  }, []);
  
*/