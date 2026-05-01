import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth({allowRoles}){
 const {isLoggedIn,role}=useSelector((state)=>state.auth);
 const location=useLocation();
 return isLoggedIn && allowRoles.find((myRole)=>myRole==role)?(<Outlet/>)
 :isLoggedIn?(<Navigate to="/denied" state={{ from: location }} replace={false} />):(<Navigate to="/login"/>)
}
export default RequireAuth;