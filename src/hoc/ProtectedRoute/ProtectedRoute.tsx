import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { fetchGetUser, TAuthSlice } from "../../services/slices/auth";
import { useEffect, FC } from "react";
import { getCookie } from "../../utils/cookies";


const ProtectedRoute: FC<{
  children: React.ReactNode;
  anonymous?: boolean;
}> = ({ children, anonymous }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');

  const fromPage = location?.state?.from?.pathname || "/";

  const authenticated = useSelector((state: TAuthSlice) =>
    state?.auth?.user?.name
  );

  useEffect(() => {
    !authenticated && accessToken && dispatch(fetchGetUser());
  }, []);

  if (anonymous && authenticated) {
    return <Navigate to={fromPage} />;
  }

  return anonymous || authenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
