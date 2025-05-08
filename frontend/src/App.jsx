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





import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginFormPage  from "./components/LoginFormPage/LoginFormPage.jsx";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage.jsx";
import Navigation     from "./components/Navigation/Navigation.jsx";
import * as sessionActions from "./store/session";

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
      { path: "/",      element: <h1>Welcome!</h1> },
      { path: "/login", element: <LoginFormPage /> },
      { path: "/signup",element: <SignupFormPage /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}



