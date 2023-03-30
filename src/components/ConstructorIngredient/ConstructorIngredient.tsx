import { useRef, FC } from "react";
import styles from "./ConstructorIngredient.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { dragItemTypes } from "../../utils/itemTypes";
import { useAppDispatch } from "../../hooks/redux";
import {
  removeConstrucorIngredient,
  moveConstructorIngredient,
} from "../../services/slices/burgerConstructor";
import { useDrop, useDrag, DragSourceHookSpec } from "react-dnd";
import TIngredient from "../../types/ingredient";


const ConstructorIngredient: FC<{
  ingredient: TIngredient,
  constructorId?: string,
  index?: number,

}> = ({ constructorId, ingredient, index }) => {
  const dispatch = useAppDispatch();
  const dragRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLInputElement>(null);

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
    hover(item: any, monitor) {
      const dragIndex = item.index ? item.index : 0;
      const hoverIndex = index ? index : 0;
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

      const hoverClientY = (clientOffset?.y !== undefined ? clientOffset.y : 0) - hoverBoundingRect.top;
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
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => {
            dispatch(removeConstrucorIngredient(String(constructorId)));
          }}
        />
      </div>
    </div>
  );
};




export default ConstructorIngredient;
