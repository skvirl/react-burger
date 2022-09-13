import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./App.module.css";
// import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { getIngredientsData, cachedData, initialConstructorIngredientData } from "../../utils/data";
import {
  ContructorIngredientsContext,
  IngredientsDataContext,
} from "../../utils/context";

function App() {
  const [hasError, setHasError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getIngredientsData(setData, setIsLoaded, setHasError);
  }, []);

  // //devmod  использую если нет доступа к api
  // if (hasError) {
  //   setData(cachedData);
  //   setHasError(false);
  // }

  function reducer(state, action) {
    switch (action.type) {
      case "addBun":
        return { ...state, bunId:action.ingredientId };
      case "removeBun":
        return { ...state, bunId:null };
      case "addIngredient":
         state.ingredients.push(action.ingredientId)   
        return { ...state };
      case "removeIngredient":
        const  existingIngredientIndex = state.ingredients.findIndex((val) => val === action.ingredientId )  
        if(existingIngredientIndex>=0) state.ingredients.splice(existingIngredientIndex,1);  
        return { ...state };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }
  const [contructorIngredients, dispatchContructorIngredients] = React.useReducer(reducer, initialConstructorIngredientData);

   //   dispatchContructorIngredients({ type: "addBun", ingredientId:'1' });
   
  return (
    <>
      {isLoaded && (
        <div className={styles.app}>
 

          <AppHeader />
          <main className={styles.app__main}>
            {hasError ? (
              <div
                className={
                  "text text_type_main-large " + styles.dataLoadingError
                }
              >
                Ошибка получения данных. <br /> Не паникуйте. В следующий раз
                всё обязательно получится!
              </div>
            ) : (
              <div className={styles.container}>
                <ContructorIngredientsContext.Provider value={{contructorIngredients, dispatchContructorIngredients}}>
                  <IngredientsDataContext.Provider value={data}>
                    <section className={styles.mainSection}>
                      <BurgerIngredients  />
                    </section>
                    <section className={styles.mainSection}>
                      <BurgerConstructor  />
                    </section>
                  </IngredientsDataContext.Provider>
                </ContructorIngredientsContext.Provider>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
}

export default App;
