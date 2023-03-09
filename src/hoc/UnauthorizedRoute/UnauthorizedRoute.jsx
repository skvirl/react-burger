import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnauthorizedRoute = ({ children }) => {
  const authenticated = useSelector((state) =>
    Boolean(state?.auth?.user?.name)
  );

  return !authenticated ? children : <Navigate to={-1} replace />;
};

export default UnauthorizedRoute;
