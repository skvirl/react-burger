import React from "react";
import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructorPage.module.css";
import BurgerConstructor from "../../../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../../BurgerIngredients/BurgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { fetchBurgerIngredients } from "../../../../services/slices/burgerIngredients";

function BurgerConstructorPage() {
  const dispacth = useDispatch();
  const { isLoaded, hasError } = useSelector((state) => ({
    isLoaded: Boolean(state.burgerIngredients.burgerIngredients),
    hasError: state.burgerIngredients.burgerIngredientsLoadingError,
  }));

  React.useEffect(() => {
    dispacth(fetchBurgerIngredients());
  }, [dispacth]);

  return (
    <>
      {isLoaded && (

          <main className={styles.main}>
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
        
      )}
    </>
  );
}

export default BurgerConstructorPage;
