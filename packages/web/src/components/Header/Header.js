import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as ROUTES from "../../routes";
import { signOut } from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <header className="p-4">
      <nav className="flex align-items-middle">
        <ul className="list-none flex">
          <li className="mr-4 px-3 py-2 bg-gray-600">
            <NavLink to={ROUTES.HOME}>Home</NavLink>
          </li>
          {!isAuthenticated && (
            <>
              <li className="mr-4 px-3 py-2 bg-gray-600">
                <NavLink to={ROUTES.LOGIN}>Login</NavLink>
              </li>
              <li className="mr-4 px-3 py-2 bg-gray-600">
                <NavLink to={ROUTES.SIGN_UP}>Sign up</NavLink>
              </li>
            </>
          )}
          <li className="mr-4 px-3 py-2 bg-gray-600">
            <NavLink to={ROUTES.RESET_PASSWORD}>Reset password</NavLink>
          </li>
        </ul>

        {isAuthenticated && (
          <button
            className="btn btn-primary m-0"
            type="button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
