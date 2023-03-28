import { Navigate, useLocation } from "react-router-dom";
import { fetchGetUser } from "../../services/slices/auth";
import { useEffect, FC } from "react";
import { getCookie } from "../../utils/cookies";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const ProtectedRoute: FC<{
  children: React.ReactNode;
  anonymous?: boolean;
}> = ({ children, anonymous }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const accessToken = getCookie('accessToken');

  const fromPage = location?.state?.from?.pathname || "/";

  const authenticated = useAppSelector((state) =>
    state?.auth?.user?.name
  );

  useEffect(() => {
    !authenticated && accessToken && dispatch(fetchGetUser({}));
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
