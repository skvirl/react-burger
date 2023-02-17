import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { getIngredientsData } from "../../utils/api";
import useFetch from "../../hooks/useFetch";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { setBurgerIngredients } from "../../services/reducers/burgerSlice";

function App() {
  const { isLoaded, hasError, data, executeApiRequest } =
    useFetch(getIngredientsData);

  const dispacth = useDispatch();

  React.useEffect(() => {
    if (data) {
      dispacth(setBurgerIngredients(data.data));
    } else {
      executeApiRequest();
    }
  }, [data]);

 
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
              <DndProvider backend={HTML5Backend}>
                <div className={styles.container}>
                  <section className={styles.mainSection}>
                    <BurgerIngredients />
                  </section>
                  <section className={styles.mainSection}>
                    <BurgerConstructor />
                  </section>
                </div>
              </DndProvider>
            )}
          </main>
        </div>
      )}
    </>
  );
}

export default App;
