import './App.scss';
import React, { useState } from 'react';
import {HashRouter,Routes, Route, Link, BrowserRouter} from 'react-router-dom'
import Home from './page/Home';
import Item from './page/Item';
import Detail from './page/Detail';
import RandomFood from './page/RandomFood';
import CountryRecipeList from './page/CountryRecipeList';

function App() {
  

  return (
    <HashRouter basename='/'>
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