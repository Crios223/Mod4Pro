// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <li>
//         <ProfileButton user={sessionUser} />
//       </li>
//     );
// } else {
//     sessionLinks = (
//       <><li>
//         <OpenModalButton
//           buttonText="Log In"
//           modalComponent={<LoginFormModal />} />
//       </li><li>
//           <OpenModalButton
//             buttonText="Sign Up"
//             modalComponent={<SignupFormModal />} />
//         </li></>
//     );
// }

//   return (
//     <ul>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       {isLoaded && sessionLinks}
//     </ul>
//   );
// }

// export default Navigation;

// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import "./Navigation.css";

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((s) => s.session.user);

//   return (
//     <ul className="nav-bar">
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>

//       {/* always render ProfileButton; it decides what to show */}
//       {isLoaded && (
//         <li>
//           <ProfileButton user={sessionUser} />
//         </li>
//       )}
//     </ul>
//   );
// }

// export default Navigation;






// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import "./Navigation.css";

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector(state => state.session.user);

//   return (
//     <ul className="nav-bar">
//       <li>
//         <NavLink to="/" exact>
//           <img src="/favicon.ico" alt="Home" className="favicon" />
//         </NavLink>
//       </li>


//       <li>
//         <NavLink to="/" exact>
//           Home
//         </NavLink>
//       </li>


//       {isLoaded && sessionUser && (
//         <li>
//           <NavLink to="/spots/new">
//             Create a New Spot
//           </NavLink>
//         </li>
//       )}

//       {isLoaded && (
//         <li className="profile-li">
//           <ProfileButton user={sessionUser} />
//         </li>
//       )}
//     </ul>
//   );
// }

// export default Navigation;


import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="nav-bar">
      {/* favicon on the very left */}
      <li>
        <NavLink to="/" end>
          <img src="/favicon.ico" alt="Home" className="favicon" />
        </NavLink>
      </li>

      {/* your existing links */}
      <li>
        <NavLink to="/" end>
          Home
        </NavLink>
      </li>

     + {isLoaded && sessionUser && (
    <li className="create-li">
      <NavLink to="/spots/new">
        Create a New Spot
      </NavLink>
    </li>
  )}

      {/* profile button pushed to the right */}
      {isLoaded && (
        <li className="profile-li">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;