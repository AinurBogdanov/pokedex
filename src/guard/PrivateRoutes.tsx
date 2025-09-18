import { Navigate, Outlet, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsUserExist, selectIsUserLoading } from '../redux/user/userSlice';

const PrivateRoutes = () => {
  const userExist = useSelector(selectIsUserExist);
  const userLoading = useSelector(selectIsUserLoading);
  const location = useLocation();

  if (userLoading) {
    console.log('user is loading');
    return 'Loading...';
  }

  if (!userExist && !userLoading) {
    console.log('user does`t exist');

    return <Navigate to="/auth" state={{ from: location }} replace />;
    // return 'navigated to auth';
  }
  return <Outlet />;
};

export default PrivateRoutes;
