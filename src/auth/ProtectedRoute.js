import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ component: Component, ...rest }) {

    const token = useSelector((state) => state.AccountReducer.token);
    if (token) {
        return (
            <Outlet />
        )
    }
    else {
        return (
            <Navigate to="/login" />
        )
    }

}