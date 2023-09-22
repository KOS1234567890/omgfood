import axios from 'axios';

export const FoodContext = axios.create({
    baseURL : 'https://api.spoonacular.com/',
    params:{apiKey:'4c38a3a9e2c64aa0a7f2cdd04e22a860'}
});

export let db = {
    cStr1 : ['food','recipes'],
    cStr2 : ['search?query=','findByIngredients?ingredients=','information?'],
    img_search : 'https://spoonacular.com/recipeImages/632485-312x231.jpg',
    db_All : async function(){
        let a = FoodContext.get(`/${this.cStr1[0]}/${this.cStr_2[0]}`),
          b = FoodContext.get(`/${this.cStr1[1]}/${this.cStr_2[1]}`),
          c = FoodContext.get(`/${this.cStr1[1]}/${this.cStr_2[2]}`);

          let result = await Promise.all([a,b,c,d]);

          return{
            'Food Search':result[0],
            'Recipe Find':result[1],
            'Recipe Info':result[2]
          }

    }
}