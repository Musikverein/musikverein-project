import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import ModalLayout from '../../components/ModalLayout';

import { PlayListList } from '../../components/PlayListList/PlayListList';
import { ProfileEdit } from '../../components/ProfileEdit/ProfileEdit';
import SongList from '../../components/SongList';
import Spinner from '../../components/Spinner';
import { UserList } from '../../components/UserList/UserList';
import { authSelector } from '../../redux/auth/auth-selectors';
import { selectUserByIdState } from '../../redux/user/user-selectors';
import {
  followUser,
  getUserView,
  getUserViewFollowed,
  getUserViewFollowing,
  getUserViewPlayLists,
  getUserViewSongs,
} from '../../redux/userView/userView-actions';
import { userViewSelector } from '../../redux/userView/userView-selectors';

import './User.scss';

export const User = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);
  const state = useSelector(selectUserByIdState(userId));
  const {
    userSongs,
    userPlayLists,
    isGettingUserViewSongs,
    isGettingUserViewPlayLists,
    isGettingUserViewFollowed,
    isGettingUserViewFollowing,
  } = useSelector(userViewSelector);
  const [isModalFollowedOpen, setIsModalFollowedOpen] = useState(false);
  const [isModalFollowingOpen, setIsModalFollowingOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getUserView({ userId }));
    dispatch(getUserViewSongs({ userId }));
    dispatch(getUserViewPlayLists({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (isModalFollowedOpen) {
        setIsModalFollowedOpen(!isModalFollowedOpen);
      }
      if (isModalFollowingOpen) {
        setIsModalFollowingOpen(!isModalFollowingOpen);
      }
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (!state) {
    return <Spinner />;
  }

  const { image, userName, followedBy, following } = state;

  const handleFollowed = () => {
    if (!isModalFollowedOpen) {
      dispatch(getUserViewFollowed({ userId }));
    }
    setIsModalFollowedOpen(!isModalFollowedOpen);
  };
  const handleFollowing = () => {
    if (!isModalFollowingOpen) {
      dispatch(getUserViewFollowing({ userId }));
    }

    setIsModalFollowingOpen((prevState) => !prevState);
  };

  const handleFollow = () => {
    dispatch(followUser({ userId }));
  };

  const handleModalEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <>
      <Header />
      <section className="main-container px-4">
        <div className="py-4">
          <img
            className="w-32 h-32 rounded-full mx-auto object-cover images-shadow"
            src={image}
            alt="profile"
          />
          <div className="user-info">
            <h2 className="text-title-h2 pb-4">{userName}</h2>
            {userId === currentUser ? (
              <button
                type="button"
                className="rounded-4 button-secondary btn"
                onClick={handleModalEdit}
              >
                Edit your profile
              </button>
            ) : (
              <button
                type="button"
                className="mr-4 hover:underline"
                onClick={handleFollow}
              >
                {followedBy?.includes(currentUser) ? 'Unfollow' : 'Follow'}
              </button>
            )}
            <div className="flex text-gray-200">
              <button
                type="button"
                className="mr-4 hover:underline text-text"
                onClick={handleFollowed}
                disabled={followedBy?.length === 0}
              >
                {followedBy?.length} Followers
              </button>
              <button
                type="button"
                className="hover:underline text-text"
                onClick={handleFollowing}
                disabled={following?.length === 0}
              >
                {following?.length} Following
              </button>
            </div>
          </div>
        </div>
        <div className="user-playlists pt-4">
          <h2 className="text-2xl font-bold pb-2">
            {userName}&#39;s Playlist:
          </h2>
          <div className="container-playlist-loader">
            <PlayListList
              loading={isGettingUserViewPlayLists}
              playlists={userPlayLists}
              count={2}
            />
          </div>
        </div>
        <div className="user-songs pt-6">
          <h2 className="text-2xl font-bold">{userName}&#39;s Songs:</h2>
          <div className="user-songs-song">
            <SongList loading={isGettingUserViewSongs} songs={userSongs} />
          </div>
        </div>
        {isModalFollowedOpen && (
          <ModalLayout
            isOpen={isModalFollowedOpen}
            handleClose={handleFollowed}
          >
            <section className="w-full h-3/4 flex flex-col items-center px-4">
              <h2 className="text-title-h2">The followed:</h2>
              <UserList
                loading={isGettingUserViewFollowed}
                users={followedBy}
              />
            </section>
          </ModalLayout>
        )}
        {isModalFollowingOpen && (
          <ModalLayout
            isOpen={isModalFollowingOpen}
            handleClose={handleFollowing}
          >
            <section className="w-full h-3/4 flex flex-col items-center px-4">
              <h2 className="text-title-h2">The followings:</h2>
              <UserList
                loading={isGettingUserViewFollowing}
                users={following}
              />
            </section>
          </ModalLayout>
        )}
        {currentUser === userId && (
          <ModalLayout isOpen={isEditing} handleClose={handleModalEdit}>
            <ProfileEdit handleClose={handleModalEdit} />
          </ModalLayout>
        )}
      </section>
    </>
  );
};
