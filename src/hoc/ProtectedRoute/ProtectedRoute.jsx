import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { fetchGetUser } from "../../services/slices/auth";
import { useEffect } from "react";
import { getCookie } from "../../utils/cookies";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');

  const authenticated = useSelector((state) =>
    Boolean(state?.auth?.user?.name)
  );

  useEffect(() => { 
    !authenticated && accessToken && dispatch(fetchGetUser(accessToken));
  }, []);
  return authenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
