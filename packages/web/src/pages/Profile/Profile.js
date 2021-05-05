import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/auth/auth-selectors';

import './Profile.scss';
import { ModalLayout } from '../../components/ModalLayout/ModalLayout';
import { ProfileEdit } from '../../components/ProfileEdit/ProfileEdit';

export const Profile = () => {
  const history = useHistory();
  const { currentUser } = useSelector(authSelector);
  const { followedBy, following } = currentUser;
  const [isEditing, setIsEditing] = useState(false);

  const handleModal = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, [setIsEditing]);

  return (
    <>
      <main className="main-container-without-header">
        <div className="h-14 w-full flex justify-end items-center sticky top-0 pt-4 bg__primary">
          <button
            type="button"
            className="absolute left-0 px-4 bx bxs-chevron-left text-4xl"
            onClick={() => history.goBack()}
          />
        </div>
        <div className="pt-8 text-center h-64">
          <img
            src={currentUser.image}
            className="w-32 h-32 rounded-full mx-auto border-2 border-mk-magenta object-cover"
            alt="profile"
          />
          <h3 className="font-medium mt-4 mb-4">
            {currentUser.userName || 'Complete your profile'}
          </h3>
          <button
            type="button"
            className="rounded-4 button-secundary btn"
            onClick={handleModal}
          >
            Edit your profile
          </button>
        </div>

        <div className="flex justify-around text-center p-6">
          <div>
            <span className="font-medium">{followedBy.length}</span>
            <p className="font-light text-xs">FOLLOWERS</p>
          </div>
          <div>
            <span className="font-medium">{following.length}</span>
            <p className="font-light text-xs">FOLLOWING</p>
          </div>
        </div>
      </main>
      <ModalLayout isOpen={isEditing} handleClose={handleModal}>
        <ProfileEdit handleClose={handleModal} />
      </ModalLayout>
    </>
  );
};
