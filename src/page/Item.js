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

