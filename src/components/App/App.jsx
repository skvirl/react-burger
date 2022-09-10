import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./App.module.css";
// import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { getIngredientsData, cachedData } from "../../utils/data";

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
                <section className={styles.mainSection}>
                  <BurgerIngredients ingredientData={data} />
                </section>
                <section className={styles.mainSection}>
                  <BurgerConstructor ingredientData={data} />
                </section>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
}

export default App;
