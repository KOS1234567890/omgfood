import './App.scss';
import React, { useState } from 'react';
import {HashRouter,Routes, Route, Link} from 'react-router-dom'
import Home from './page/Home';
import Item from './page/Item';
import Detail from './page/Detail';
import RandomFood from './page/RandomFood';
import CountryRecipeList from './page/CountryRecipeList';
function App() {


  return (
    <HashRouter>
      <Link to = "/"></Link>
      <Link to = "/RandomFood"></Link>
      <Link to = "/Detail"></Link>
      <Item>
        <Routes>
          <Route path='/'element={<Home/>}/>
          <Route path='/RandomFood'element={<RandomFood/>}/>
          <Route path='/CountryRecipeList'element={<CountryRecipeList/>}/>
          <Route path='/#/Detail/:id'element={<Detail/>}/>
          <Route path='/Detail/:recipeId'element={<Detail/>}/>
        </Routes>
      </Item>
    </HashRouter>
  );
}

export default App;
/* 
quizCompleted ? (<QuizResult score={score} />) : (<FoodQuiz onComplete={handleQuizComplete} />)

  선생님 api키 : e75a0c51a42b41b9b9a0c7f845048434
  내 api 키 : 4c38a3a9e2c64aa0a7f2cdd04e22a860
  2번째 api키 : 4a799b85e9ea49c59fa9e2523778e512
  3번쨰 api키 : 57ab8d0aae9e4598a7d77ae876505b6d
*/