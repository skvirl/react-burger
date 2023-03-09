import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogout } from "../../../../services/slices/auth";
import { getCookie } from "../../../../utils/cookies";  
import { useEffect } from "react"; 

const Logout = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const refreshToken = getCookie('refreshToken');
    dispatch(
      fetchLogout({
        token: refreshToken,
      })
    );
  
  }, []);
 
   return <Navigate to="/login" replace />;
};

export default Logout;
