function App() {
  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let background = location.state && location.state.background;

    const handleModalClose = () => {
      dispatch({
        type: RESET_ITEM_TO_VIEW,
      });
      navigate(-1);
    };

    return (
      <>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<Main />} />
          <Route
            path="/profile/orders/:orderNumber"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ingredients/:ingredientId"
            element={<IngredientsDetails />}
          />
          <Route element={<NotFound404 />} />
        </Routes>

        {background && (
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal onClose={handleModalClose}>
                <IngredientsDetails />
              </Modal>
            }
          />
        )}
        {background && (
          <Route
            path="/profile/orders/:orderNumber"
            element={
              <ProtectedRoute>
                <Modal onClose={handleModalClose}>
                  <OrderPage />
                </Modal>
              </ProtectedRoute>
            }
          />
        )}
      </>
    );
  };

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}
