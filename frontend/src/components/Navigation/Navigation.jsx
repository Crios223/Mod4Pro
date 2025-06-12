import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { fetchCurrentSpots } from "../../store/spots";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  
  const userSpotsObj = useSelector((state) => state.spots.userSpots);
  const userSpots = Object.values(userSpotsObj || {});

  
  useEffect(() => {
    if (sessionUser) {
      dispatch(fetchCurrentSpots());
    }
  }, [dispatch, sessionUser]);

  
  const showCreateButton = isLoaded && sessionUser && userSpots.length === 0;

  return (
    <ul className="nav-bar">
      <li>
        <NavLink to="/" end>
          <img src="/favicon.ico" alt="Home" className="favicon" />
        </NavLink>
      </li>

      
      <li>
        <NavLink to="/" end>
          <img
            src="/BurrowFinder.png"
            alt="BurrowFinder Home"
            className="site-logo"
          />
        </NavLink>
      </li>

      
      <li className="spacer" />

      
      {showCreateButton && (
        <li className="create-li">
          <NavLink to="/spots/new" className="nav-link">
            Create a New Spot
          </NavLink>
        </li>
      )}

      
      {isLoaded && (
        <li className="profile-li">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;