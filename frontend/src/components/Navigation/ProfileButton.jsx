// import { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { FaUserCircle } from "react-icons/fa";
// import * as sessionActions from "../../store/session";
// import OpenModalButton   from "../OpenModalButton/OpenModalButton.jsx";
// import LoginFormModal    from "../LoginFormModal";
// import SignupFormModal   from "../SignupFormModal";

// function ProfileButton({ user }) {
//   const dispatch   = useDispatch();
//   const [show, setShow] = useState(false);
//   const ulRef      = useRef();

//   const toggleMenu = (e) => {
//     e.stopPropagation();
//     setShow(!show);
//   };

//   /* close on outside click */
//   useEffect(() => {
//     if (!show) return;

//     const closeMenu = (e) => {
//       if (ulRef.current && !ulRef.current.contains(e.target)) setShow(false);
//     };
//     document.addEventListener("click", closeMenu);
//     return () => document.removeEventListener("click", closeMenu);
//   }, [show]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   const ulClassName = "profile-dropdown" + (show ? "" : " hidden");

//   return (
//     <>
//       <button className="profile-btn" onClick={toggleMenu}>
//         <FaUserCircle />
//       </button>

//       <ul ref={ulRef} className={ulClassName}>
//         {user ? (
//           <>
//             <li>{user.username}</li>
//             <li>{user.firstName} {user.lastName}</li>
//             <li>{user.email}</li>
//             <li><button onClick={logout}>Log Out</button></li>
//           </>
//         ) : (
//           <>
//             <li>
//               <OpenModalButton
//                 buttonText="Log In"
//                 modalComponent={<LoginFormModal />}
//               />
//             </li>
//             <li>
//               <OpenModalButton
//                 buttonText="Sign Up"
//                 modalComponent={<SignupFormModal />}
//               />
//             </li>
//           </>
//         )}
//       </ul>
//     </>
//   );
// }

// export default ProfileButton;






// import { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import * as sessionActions from "../../store/session";
// import OpenModalButton   from "../OpenModalButton/OpenModalButton.jsx";
// import LoginFormModal    from "../LoginFormModal";
// import SignupFormModal   from "../SignupFormModal";

// function ProfileButton({ user }) {
//   const dispatch   = useDispatch();
//   const [show, setShow] = useState(false);
//   const ulRef      = useRef();

//   const toggleMenu = (e) => {
//     e.stopPropagation();
//     setShow(!show);
//   };

//   /* close on outside click */
//   useEffect(() => {
//     if (!show) return;

//     const closeMenu = (e) => {
//       if (ulRef.current && !ulRef.current.contains(e.target)) setShow(false);
//     };
//     document.addEventListener("click", closeMenu);
//     return () => document.removeEventListener("click", closeMenu);
//   }, [show]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   const ulClassName = "profile-dropdown" + (show ? "" : " hidden");

//   return (
//     <>
//       <button className="profile-btn" onClick={toggleMenu}>
//         <FaUserCircle />
//       </button>

//       <ul ref={ulRef} className={ulClassName}>
//         {user ? (
//           <>
//             <li>{user.username}</li>
//             <li>{user.firstName} {user.lastName}</li>
//             <li>{user.email}</li>
//             <li>
//               <NavLink to="/spots/manage">Manage Spots</NavLink>
//             </li>
//             <li><button onClick={logout}>Log Out</button></li>
//           </>
//         ) : (
//           <>
//             <li>
//               <OpenModalButton
//                 buttonText="Log In"
//                 modalComponent={<LoginFormModal />}
//               />
//             </li>
//             <li>
//               <OpenModalButton
//                 buttonText="Sign Up"
//                 modalComponent={<SignupFormModal />}
//               />
//             </li>
//           </>
//         )}
//       </ul>
//     </>
//   );
// }

// export default ProfileButton;




// import { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import * as sessionActions from "../../store/session";
// import OpenModalButton   from "../OpenModalButton/OpenModalButton.jsx";
// import LoginFormModal    from "../LoginFormModal";
// import SignupFormModal   from "../SignupFormModal";

// function ProfileButton({ user }) {
//   const dispatch   = useDispatch();
//   const [show, setShow] = useState(false);
//   const ulRef      = useRef();

//   const toggleMenu = (e) => {
//     e.stopPropagation();
//     setShow(!show);
//   };

//   /* close on outside click */
//   useEffect(() => {
//     if (!show) return;

//     const closeMenu = (e) => {
//       if (ulRef.current && !ulRef.current.contains(e.target)) setShow(false);
//     };
//     document.addEventListener("click", closeMenu);
//     return () => document.removeEventListener("click", closeMenu);
//   }, [show]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   const ulClassName = "profile-dropdown" + (show ? "" : " hidden");

//   return (
//     <>
//       <button className="profile-btn" onClick={toggleMenu}>
//         <FaUserCircle />
//       </button>

//       <ul ref={ulRef} className={ulClassName}>
//         {user ? (
//           <>
//             <li>Hello, {user.username}</li>
//             <li>{user.username}</li>
//             <li>{user.firstName} {user.lastName}</li>
//             <li>{user.email}</li>
//             <li>
//               <NavLink to="/spots/manage">Manage Spots</NavLink>
//             </li>
//             <li>
//               <NavLink to="/reviews/manage">Manage Reviews</NavLink>
//             </li>
//             <li>
//               <button onClick={logout}>Log Out</button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <OpenModalButton
//                 buttonText="Log In"
//                 modalComponent={<LoginFormModal />}
//               />
//             </li>
//             <li>
//               <OpenModalButton
//                 buttonText="Sign Up"
//                 modalComponent={<SignupFormModal />}
//               />
//             </li>
//           </>
//         )}
//       </ul>
//     </>
//   );
// }

// export default ProfileButton;



import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton/OpenModalButton.jsx";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'; // if you have extra styles

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const ulRef = useRef();

  const toggleMenu = e => {
    e.stopPropagation();
    setShow(prev => !prev);
  };

  useEffect(() => {
    if (!show) return;
    const closeMenu = e => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [show]);

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShow(false);
  };

  const loginDemo = async e => {
    e.preventDefault();
    // Replace with your actual demo credentials:
    await dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }));
    setShow(false);
  };

  const ulClassName = "profile-dropdown" + (show ? "" : " hidden");

  return (
    <>
      <button
        className="profile-btn"
        onClick={toggleMenu}
        style={{ marginLeft: "auto" }}
      >
        <FaUserCircle />
      </button>

      <ul ref={ulRef} className={ulClassName}>
        {user ? (
          <>
            <li>Hello, {user.username}</li>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li><NavLink to="/spots/manage">Manage Spots</NavLink></li>
            <li><NavLink to="/reviews/manage">Manage Reviews</NavLink></li>
            <li><button onClick={logout}>Log Out</button></li>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
            <li>
              <button onClick={loginDemo}>
                Log in as Demo User
              </button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;