import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { initialConstructorIngredientData} from "../../utils/data";
import { getIngredientsData } from "../../utils/api";
import useFetch from "../../hooks/useFetch";
import {
  ConstructorIngredientsContext,
  constructorIngredientsReducer, 
  IngredientsDataContext,
} from "../../utils/context";

function App() {
 
  const {isLoaded,hasError,data,executeApiRequest} = useFetch(getIngredientsData);
   
  React.useEffect(() => {
    executeApiRequest();
  }, []);
 

  const [constructorIngredients, dispatchСonstructor] = React.useReducer(constructorIngredientsReducer, initialConstructorIngredientData);
     
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
                <ConstructorIngredientsContext.Provider value={{constructorIngredients, dispatchСonstructor}}>
                  <IngredientsDataContext.Provider value={data.data}>
                    <section className={styles.mainSection}>
                      <BurgerIngredients  />
                    </section>
                    <section className={styles.mainSection}>
                      <BurgerConstructor  />
                    </section>
                  </IngredientsDataContext.Provider>
                </ConstructorIngredientsContext.Provider>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
}

export default App;
