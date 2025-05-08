import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((s) => s.session.user);

  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <>
      <li><NavLink to="/login">Log In</NavLink></li>  {/* regular space */}
      <li><NavLink to="/signup">Sign Up</NavLink></li> {/* regular space */}
    </>
  );

  return (
    <ul className="nav-bar">
      <li><NavLink to="/">Home</NavLink></li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;