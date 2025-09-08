import { Outlet } from 'react-router';
import { Header } from '../common/Header/Header';

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
