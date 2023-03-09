import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { fetchGetUser } from "../../services/slices/auth";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const authenticated = useSelector((state) =>
    Boolean(state?.auth?.user?.name)
  );

  useEffect(() => {
    !authenticated && dispatch(fetchGetUser());
  }, []);

  return authenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
