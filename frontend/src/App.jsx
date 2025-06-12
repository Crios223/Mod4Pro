import { useState, useEffect } from 'react';
import { useDispatch }       from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

import Navigation  from './components/Navigation/Navigation.jsx';
import SpotIndex   from './components/Spots/SpotIndex.jsx';
import SpotForm    from './components/Spots/SpotForm.jsx';
import SpotShow    from './components/Spots/SpotShow.jsx';
import ManageSpots from './components/Spots/ManageSpots.jsx';
import ManageReviews from './components/Reviews/ManageReviews.jsx';
import * as sessionActions from './store/session';



function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      
      { index: true, element: <SpotIndex /> },

      
      {
        path: 'spots',
        children: [
          { path: 'manage', element: <ManageSpots /> },
          { path: 'new',    element: <SpotForm /> },
          { path: ':spotId',      element: <SpotShow /> },
          { path: ':spotId/edit', element: <SpotForm mode="edit" /> },
        ],
      },

      
      {
        path: 'reviews/manage',
        element: <ManageReviews />
      },
    ],
  },
]);







export default function App() {
  return <RouterProvider router={router} />;
}