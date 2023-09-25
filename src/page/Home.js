import React from 'react'
import List from './List';
import Header from './Header';
import RecipeList from './RecipeList';
import RandomFood from './RandomFood';
function Home() {
  return (
        <main>
            <div className='main-containner'>
                <Header/>
                <List/>
                <RecipeList/>
            </div>
        </main>
  )
}


export default Home



/* 

1. 

*/
