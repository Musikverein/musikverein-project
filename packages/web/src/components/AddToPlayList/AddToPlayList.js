import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addSongToPlayList,
  getUserPlayLists,
} from '../../redux/libraryPlayList/libraryPlayList-actions';
import * as LibraryPlayListTypes from '../../redux/libraryPlayList/libraryPlayList-types';
import { userPlayListSelector } from '../../redux/libraryPlayList/libraryPlayList-selectors';
import Spinner from '../Spinner';
import AddToPlayListCard from '../AddToPlayListCard';

export const AddToPlayList = ({ image, title, songId }) => {
  const { isGettingUserPlayList, userPlayLists } = useSelector(
    userPlayListSelector,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getUserPlayLists(LibraryPlayListTypes.USER_PLAYLIST_PATH_OWN_PLAYLIST),
    );
  }, [dispatch]);
  const handlePlayListSelected = (playListId) => {
    dispatch(addSongToPlayList({ playListId, songId }));
  };
  return (
    <section className="flex flex-col justify-center">
      <div className="flex flex-col  items-center text-white p-4">
        <img
          className="w-32 h-32 border-2 border-mk-magenta object-cover rounded-4"
          src={image}
          alt={title}
        />

        <h2 className="p-2">{title}</h2>
      </div>
      <hr />
      <section className="flex flex-col text-white w-full p-4">
        {isGettingUserPlayList ? (
          <Spinner />
        ) : (
          userPlayLists.length > 0 &&
          userPlayLists.map((playListId) => (
            <AddToPlayListCard
              key={playListId}
              playListId={playListId}
              handleSubmit={() => handlePlayListSelected(playListId)}
              songId={songId}
            />
          ))
        )}
      </section>
    </section>
  );
};

AddToPlayList.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  songId: PropTypes.string.isRequired,
};
