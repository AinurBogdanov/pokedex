import { Navigate, Outlet } from 'react-router';

const PrivateRoutes = ({ user }: { user: object | undefined }) => {
  if (user === undefined) return <>Loading...</>;

  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
