import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import { PlayListCard } from '../../components/PlayListCard/PlaylistCard';
import { SongCard } from '../../components/SongCard/SongCard';
import { play } from '../../redux/player/player-actions';
import { selectUserByIdState } from '../../redux/user/user-selectors';
import {
  getUserView,
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
  const { userSongs, userPlayLists } = useSelector(userViewSelector);

  useEffect(() => {
    dispatch(getUserView({ userId }));
  }, [dispatch, userId]);
  useEffect(() => {
    dispatch(getUserViewSongs({ userId }));
  }, [dispatch, userId]);
  useEffect(() => {
    dispatch(getUserViewPlayLists({ userId }));
  }, [dispatch, userId]);

  if (!state) {
    return <Redirect to={ROUTES.HOME} />;
  }

  const { image, userName, followedBy, following } = state;

  const handlePlaySong = ({ songId }) => {
    dispatch(play(songId));
  };

  return (
    <section className="main-container-without-header">
      <div className="user-info">
        <img src={image} alt="profile" />
        <div>
          <h2>{userName}</h2>
          <p>{`${followedBy.length} Followers · ${following.length} Following`}</p>
        </div>
      </div>
      <div className="user-playlists">
        {userPlayLists.map((playlist) => (
          <PlayListCard key={playlist} playListId={playlist} />
        ))}
      </div>
      <div className="user-songs">
        {userSongs.map((song) => (
          <SongCard
            key={song}
            songId={song}
            handlePlay={() => handlePlaySong({ songId: song })}
            playListId=""
          />
        ))}
      </div>
    </section>
  );
};
