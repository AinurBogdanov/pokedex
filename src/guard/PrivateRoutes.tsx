import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsUserExist } from '../redux/user/userSlice';

const PrivateRoutes = () => {
  const userExist = useSelector(selectIsUserExist);

  if (!userExist) {
    console.log('usera nema bro');
  }

  return userExist ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
