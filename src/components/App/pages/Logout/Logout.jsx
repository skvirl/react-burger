import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {cleanAuthData} from "../../../../services/slices/auth"

const Logout =()=>{
    const dispatch = useDispatch();
    dispatch(cleanAuthData());
    return <Navigate to="/" replace />
}

export default Logout;