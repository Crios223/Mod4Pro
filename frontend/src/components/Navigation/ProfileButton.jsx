import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import OpenModalButton   from "../OpenModalButton/OpenModalButton.jsx";
import LoginFormModal    from "../LoginFormModal";
import SignupFormModal   from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch   = useDispatch();
  const [show, setShow] = useState(false);
  const ulRef      = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  /* close on outside click */
  useEffect(() => {
    if (!show) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) setShow(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [show]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (show ? "" : " hidden");

  return (
    <>
      <button className="profile-btn" onClick={toggleMenu}>
        <FaUserCircle />
      </button>

      <ul ref={ulRef} className={ulClassName}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
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
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;