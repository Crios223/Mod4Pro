// function App() {
//   return <h1> Hello from App </h1>;
// }

// export default App;


// frontend/src/App.jsx

// frontend/src/App.jsx










// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// // import LoginFormPage from './components/LoginFormPage';
// // import SignupFormPage from './components/SignupFormPage';

// import LoginFormPage  from "./components/LoginFormPage/LoginFormPage.jsx"
// import SignupFormPage from "./components/SignupFormPage/SignupFormPage.jsx"

// import * as sessionActions from './store/session';

// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => {
//       setIsLoaded(true)
//     });
//   }, [dispatch]);

//   return (
//     <>
//       {isLoaded && <Outlet />}
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <h1>Welcome!</h1>
//       },
//       {
//         path: '/login',
//         element: <LoginFormPage />
//       },
//       {
//         path: "/signup",
//         element: <SignupFormPage />
//       }
//     ]
//   }
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }





// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
// import LoginFormPage  from "./components/LoginFormPage/LoginFormPage.jsx";
// import SignupFormPage from "./components/SignupFormPage/SignupFormPage.jsx";
// import Navigation     from "./components/Navigation/Navigation.jsx";
// import * as sessionActions from "./store/session";

// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && <Outlet />}
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       { path: "/",      element: <h1>Welcome!</h1> },
//       { path: "/login", element: <LoginFormPage /> },
//       { path: "/signup",element: <SignupFormPage /> }
//     ]
//   }
// ]);

// export default function App() {
//   return <RouterProvider router={router} />;
// }

//? --- like this working but Manage spots is not

// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Navigation from './components/Navigation/Navigation.jsx';
// import * as sessionActions from './store/session';
// import SpotIndex  from './components/Spots/SpotIndex.jsx';
// import SpotForm   from './components/Spots/SpotForm.jsx';
// import SpotShow   from './components/Spots/SpotShow.jsx';




// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser())
//       .then(() => setIsLoaded(true));
//   }, [dispatch]);

//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && <Outlet />}
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       // Landing page = list all spots
//       { path: '/',                   element: <SpotIndex /> },

//       // Create a new spot
//       { path: '/spots/new',          element: <SpotForm /> },

//       // View one spot
//       { path: '/spots/:spotId',      element: <SpotShow /> },

//       // Edit existing spot
//       { path: '/spots/:spotId/edit', element: <SpotForm mode="edit" /> },

//       // Manage Spots
//       { path: '/spots/:spotId/edit', element: <SpotForm mode="edit" /> },

//     ],
//   },
// ]);

// export default function App() {
//   return <RouterProvider router={router} />;
// }















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

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       // 1) Home = spot list
//       { index: true, element: <SpotIndex /> },

//       // 2) All /spots/... under here
//       {
//         path: 'spots',
//         children: [
//           // static manage route first
//           { path: 'manage', element: <ManageSpots /> },

//           // new spot
//           { path: 'new',    element: <SpotForm /> },

//           // show details of one spot
//           { path: ':spotId', element: <SpotShow /> },

//           // edit an existing spot
//           { path: ':spotId/edit', element: <SpotForm mode="edit" /> },
//         ],
//       },
//     ],
//   },
// ]);


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // 1) Home = spot list
      { index: true, element: <SpotIndex /> },

      // 2) Spots routes
      {
        path: 'spots',
        children: [
          { path: 'manage', element: <ManageSpots /> },
          { path: 'new',    element: <SpotForm /> },
          { path: ':spotId',      element: <SpotShow /> },
          { path: ':spotId/edit', element: <SpotForm mode="edit" /> },
        ],
      },

      // 3) Reviews management
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
























// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => {
//       setIsLoaded(true)
//     });
//   }, [dispatch]);

//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && <Outlet />}
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <h1>Welcome!</h1>
//       }
//     ]
//   }
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;

