import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';

const PrivateRoutes = () => {
  const user = useSelector(selectUser);

  if (!user) {
    console.log('usera nema bro', user);
  }
  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
