import React from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./App.module.css";
// import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';


function App() {
  const [current, setCurrent] = React.useState('one')
  return (
    //<div className="App ml-5 mr-5 mb-5 mt-5">
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.app__main}>
      <div className={styles.container}>
      <section className={styles.mainSection}><BurgerIngredients /></section>
      <section className={styles.mainSection}><BurgerConstructor /></section>
      </div>
      </main>

    </div>
  );
}

export default App;
