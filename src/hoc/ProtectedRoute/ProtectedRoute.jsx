import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { fetchGetUser } from "../../services/slices/auth";
import { useEffect } from "react";
import { getCookie } from "../../utils/cookies";

const ProtectedRoute = ({ children, anonymous  }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');
 
  let fromPage = location?.state?.from?.pathname || "/";

  const authenticated = useSelector((state) =>
    state?.auth?.user?.name
  );

  useEffect(() => { 
     !authenticated && accessToken && dispatch(fetchGetUser(accessToken));
  }, []);

  if (anonymous && authenticated) {
    return <Navigate to={ fromPage } />;
  }

  return anonymous || authenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
