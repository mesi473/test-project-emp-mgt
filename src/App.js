import './App.css';
import { useEffect } from 'react';
import Login from './views/login/Login';
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute';
import AdminDashboard from './views/dashboard/admin/AdminDashboard';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from './state/actionTypes';
import { useNavigate } from "react-router-dom";
import Employees from './views/dashboard/admin/sub components/Employees';


function App() {
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  const token = useSelector((state) => state.AccountReducer.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && email) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: { email: email, accessToken: accessToken }
      })
      navigate('/dashboard/admin/default')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (

    <div className='w-full h-screen'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<ProtectedRoute />}>
          <Route path='/dashboard/admin/default' element={<AdminDashboard />} />
        </Route>
        <Route path='/dashboard' element={<ProtectedRoute />}>
          <Route path='/dashboard/admin/employees' element={<Employees />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
