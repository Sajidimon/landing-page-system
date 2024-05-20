import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";



const PrivateRoute = ({children}) => {

    const { user, loading } = useContext(AuthContext)

    if (user) {
        return children;
    }

    if (loading) {
        return <span className="loading mx-auto block mt-52 loading-dots loading-lg"></span>;
    }

    return <Navigate to='/admin-login' />
};

export default PrivateRoute;