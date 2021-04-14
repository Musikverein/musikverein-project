import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';

import { signOut } from '../../redux/auth/auth-actions';
import { authSelector } from '../../redux/auth/auth-selectors';

export const Profile = () => {
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <div>
      <Header />
      <div className="pt-16 text-center">
        <img
          src="https://i.pinimg.com/originals/6e/ff/53/6eff53e82b80fb5dd7614d5ba054f144.jpg"
          className="w-32 h-32 rounded-full mx-auto border-2 border-mk-magenta"
          alt="profile"
        />
        <h3 className="font-medium mt-4 mb-2">Nombre Usuario</h3>
        <button
          className="rounded-md px-4 border font-light text-sm border-mk-magenta mt-2"
          type="button"
        >
          Edit your profile
        </button>
      </div>
      <div className="flex justify-around text-center p-6">
        <div>
          <span className="font-medium">0</span>
          <p className="font-light text-xs">PLAYLIST</p>
        </div>
        <div>
          <span className="font-medium">0</span>
          <p className="font-light text-xs">FOLLOWERS</p>
        </div>
        <div>
          <span className="font-medium">0</span>
          <p className="font-light text-xs">FOLLOWING</p>
        </div>
      </div>
      <div>
        <h4 className="font-medium text-center">PUBLIC SONGS</h4>
        <div>TODO: AQUI VAN LAS CANCIONES</div>
      </div>
      <button type="button" onClick={handleSignOut}>
        LogOut
      </button>
    </div>
  );
};
