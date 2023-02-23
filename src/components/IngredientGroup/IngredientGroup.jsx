import {  useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./IngredientGroup.module.css";
import { useSelector } from "react-redux";
import  IngredientView  from "../IngredientView/IngredientView";
 
const IngredientGroup = ({ name, type, alt, observer }) => {
    const { ingredientData, selectedBunId } = useSelector((state) => ({
      ingredientData: state.burgerIngredients.burgerIngredients,
      selectedBunId: state.orderDetails.selectedBunId,
    }));
  
    const groupRef = useRef();
  
    useEffect(() => {
      if (!observer) return;
  
      const ingredientGroupElement = groupRef.current;
      ingredientGroupElement && observer.observe(ingredientGroupElement);
      return () =>
        ingredientGroupElement && observer.unobserve(ingredientGroupElement);
    }, [observer, groupRef]);
  
    const filteredIngedientData = useMemo(
      () =>
        ingredientData?.filter((val) => {
          return val.type === type && val._id !== selectedBunId;
        }),
      [ingredientData,type,selectedBunId]
    );
  
    return (
      <div className={styles.ingredientGroup} ref={groupRef} data-type={type}>
        <div
          className={"text text_type_main-medium " + styles.ingredientGroup__name}
        >
          {name}
        </div>
        <div className={styles.ingredientGroup__cards}>
          {filteredIngedientData?.map((val) => (
            <IngredientView
              elem={val}
              alt={alt}
              key={val._id}
            />
          ))}
        </div>
      </div>
    );
  };
  
  IngredientGroup.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    alt: PropTypes.string,
    observer: PropTypes.object,
  };
  
  export default IngredientGroup;
