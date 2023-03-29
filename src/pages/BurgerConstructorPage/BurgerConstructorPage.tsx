import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructorPage.module.css";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../services/store";

function BurgerConstructorPage() {

  const getStoreData = (state: RootState) => ({
    isLoaded: Boolean(state.burgerIngredients.burgerIngredients),
    hasError: state.burgerIngredients.burgerIngredientsLoadingError,
  });
  const { isLoaded, hasError } = useAppSelector(getStoreData);

  return (
    <>
      {isLoaded && (
        <main className={styles.main}>
          {hasError ? (
            <div
              className={"text text_type_main-large " + styles.dataLoadingError}
            >
              Ошибка получения данных. <br /> Не паникуйте. В следующий раз всё
              обязательно получится!
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
