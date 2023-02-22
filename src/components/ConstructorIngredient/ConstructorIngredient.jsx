import { useRef } from "react";
import styles from "./ConstructorIngredient.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { dragItemTypes } from "../../utils/itemTypes";
import { useDispatch } from "react-redux";
import {
  removeConstrucorIngredient,
  moveConstructorIngredient,
} from "../../services/slices/burgerConstructor";
import { useDrop, useDrag } from "react-dnd";
import { ingredientType } from "../../utils/types";
import PropTypes from "prop-types";


const ConstructorIngredient = ({ constructorId, ingredient, index }) => {
    const dispatch = useDispatch();
    const dragRef = useRef(null);
    const dropRef = useRef(null);
  
    const [{ isDragging }, drag, preview] = useDrag({
      type: dragItemTypes.CONSTRUCTOR_LIST_SORT,
      item: () => {
        return { constructorId: constructorId, index };
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  
    const [, drop] = useDrop({
      accept: dragItemTypes.CONSTRUCTOR_LIST_SORT,
      hover(item, monitor) {
        const dragIndex = item.index;
        const hoverIndex = index;
        if (!dragRef.current) {
          return;
        }
  
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = dragRef.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  
        const indexDiff = Math.abs(hoverIndex - dragIndex);
  
        if (
          indexDiff <= 1 &&
          dragIndex < hoverIndex &&
          hoverClientY < hoverMiddleY
        ) {
          return;
        }
        if (
          indexDiff <= 1 &&
          dragIndex > hoverIndex &&
          hoverClientY > hoverMiddleY
        ) {
          return;
        }
  
        dispatch(moveConstructorIngredient({ dragIndex, hoverIndex }));
  
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      },
    });
  
    drag(drop(dragRef));
    preview(drop(dropRef));
    return (
      <div ref={dropRef} className={styles.elementBox_dragable}>
        <div
          className={
            styles.elementBox_dragable +
            " " +
            (isDragging && styles.elementBox_dragable__hidden)
          }
        >
          <div ref={dragRef} className={styles.elementBox_dragIcon}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            draggable="false"
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={() => {
              dispatch(removeConstrucorIngredient(constructorId));
            }}
          />
        </div>
      </div>
    );
  };
  
  ConstructorIngredient.propTypes = {
    ingredient: ingredientType.isRequired,
    constructorId: PropTypes.string,
    index: PropTypes.number,
  };
  
  
  export default ConstructorIngredient;
