import React from 'react';
import { PlayListCard } from '../../components/PlayListCard/PlaylistCard';
import { SongCard } from '../../components/SongCard/SongCard';

import './User.scss';

export const User = () => {
  const { userId } = useParams();
  return (
    <section className="main-container-without-header">
      <div className="user-info">
        <img src={image} alt="profile" />
        <div>
          <h2>{userName}</h2>
          <p>{`${followBy.length} Followers · ${following.length} Following`}</p>
        </div>
      </div>
      <div className="user-playlists">
        {userPlayLists.map((playlist) => (
          <PlayListCard playListId={playlist._id} />
        ))}
      </div>
      <div className='user-songs'>{userSongs.map(song=> <SongCard songId={song._id} handlePlay={handlePlay})}</div>
    </section>
  );
};
