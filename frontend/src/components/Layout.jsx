import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl p-4">
        <Outlet />
      </main>
    </>
  );
}
