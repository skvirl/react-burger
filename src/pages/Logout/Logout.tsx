import { useAppDispatch } from "../../hooks/redux";
import { fetchLogout } from "../../services/slices/auth";
import { getCookie } from "../../utils/cookies";  
import { useEffect } from "react"; 

const Logout = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const refreshToken = getCookie('refreshToken');
    dispatch(
      fetchLogout({
        token: refreshToken,
      })
    );
  
  }, []);
  return <div className={`text text_type_main-medium `}> logout in process...</div>
};

export default Logout;
