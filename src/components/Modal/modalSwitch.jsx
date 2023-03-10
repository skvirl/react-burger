import { Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import IngredientDetails from "../Modal/IngredientDetails";
import { BurgerConstructorPage, NotFound404Page } from "./pages";
import Modal from "../Modal/Modal";

import { cleanIngredientDetails } from "../../services/slices/ingredientDetails";

const ModalSwitch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let background = location.state && location.state.background;

  const handleModalClose = () => {
    dispatch(cleanIngredientDetails());
    navigate(-1);
  };

  return (
    <>
      {/* <AppHeader /> */}
      <Route path={background || location}>
        <Route path="/" element={<BurgerConstructorPage />} />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails />}
        />

        <Route element={<NotFound404Page />} />
      </Route>

      {background && (
        <Route
          path="/ingredients/:ingredientId"
          element={
            <Modal onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </>
  );
};

export default ModalSwitch;
