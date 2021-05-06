import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import ModalLayout from '../../components/ModalLayout';

import { PlayListCard } from '../../components/PlayListCard/PlaylistCard';
import { SongCard } from '../../components/SongCard/SongCard';
import Spinner from '../../components/Spinner';
import { UserCard } from '../../components/UserCard/UserCard';
import { play } from '../../redux/player/player-actions';
import { selectUserByIdState } from '../../redux/user/user-selectors';
import {
  getUserView,
  getUserViewFollowed,
  getUserViewFollowing,
  getUserViewPlayLists,
  getUserViewSongs,
} from '../../redux/userView/userView-actions';
import { userViewSelector } from '../../redux/userView/userView-selectors';
import ROUTES from '../../routers/routes';

import './User.scss';

export const User = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const state = useSelector(selectUserByIdState(userId));
  const {
    userSongs,
    userPlayLists,
    isGettingUserViewFollowed,
    isGettingUserViewFollowing,
  } = useSelector(userViewSelector);
  const [isModalFollowedOpen, setIsModalFollowedOpen] = useState(false);
  const [isModalFollowingOpen, setIsModalFollowingOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserView({ userId }));
    dispatch(getUserViewSongs({ userId }));
    dispatch(getUserViewPlayLists({ userId }));
  }, [userId]);

  if (!state) {
    return <Redirect to={ROUTES.HOME} />;
  }

  const { image, userName, followedBy, following } = state;

  const handlePlaySong = ({ songId }) => {
    dispatch(play(songId));
  };

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
  return (
    <>
      <Header />
      <section className="main-container px-4">
        <div className="py-4">
          <img
            className="w-32 h-32 rounded-full mx-auto border-2 border-mk-magenta object-cover"
            src={image}
            alt="profile"
          />
          <div className="user-info">
            <h2 className="text-l font-semibold text-light">{userName}</h2>
            <div className="flex text-gray-200">
              <button
                type="button"
                className="mr-4 hover:underline"
                onClick={handleFollowed}
                disabled={followedBy.length < 1}
              >
                {followedBy.length} Followers
              </button>
              <button
                type="button"
                className="hover:underline"
                onClick={handleFollowing}
                disabled={following.length < 1}
              >
                {following.length} Following
              </button>
            </div>
          </div>
        </div>
        <div className="user-playlists pt-4">
          <h2 className="text-2xl font-bold pb-2">
            {userName}&#39;s Playlist:
          </h2>
          {/* <div className="user-playlists-playlist">
            {userPlayLists.map((playlist) => (
              <PlayListCard key={playlist} playListId={playlist} />
            ))}
          </div> */}
        </div>
        <div className="user-songs pt-6">
          <h2 className="text-2xl font-bold">{userName}&#39;s Songs:</h2>
          {/* <div className="user-songs-song">
            {userSongs.map((song) => (
              <SongCard
                key={song}
                songId={song}
                handlePlay={() => handlePlaySong({ songId: song })}
                playListId=""
              />
            ))}
          </div> */}
        </div>
        <ModalLayout isOpen={isModalFollowedOpen} handleClose={handleFollowed}>
          {isGettingUserViewFollowed ? (
            <Spinner />
          ) : (
            <div className="w-full h-full pt-16 px-4 ">
              {followedBy > 0 &&
                followedBy.map((followedId) => (
                  <UserCard key={followedId} userId={followedId} />
                ))}
            </div>
          )}
        </ModalLayout>
        {isModalFollowingOpen && (
          <ModalLayout
            isOpen={isModalFollowingOpen}
            handleClose={handleFollowing}
          >
            {isGettingUserViewFollowing ? (
              <Spinner />
            ) : (
              <div className="w-full h-full pt-16 px-4 ">
                {following.map((followingId) => {
                  return <UserCard key={followingId} userId={followingId} />;
                })}
              </div>
            )}
          </ModalLayout>
        )}
      </section>
    </>
  );
};
