import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { playListSelector } from '../../redux/playList/playList-selectors';
import { authSelector } from '../../redux/auth/auth-selectors';
import { deletePlayList } from '../../redux/libraryPlayList/libraryPlayList-actions';

export const PlayListCard = ({ playListId }) => {
  const { playLists } = useSelector(playListSelector);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isEditSong, setIsEditSong] = useState(false);
  const {
    currentUser: { _id: userId },
  } = useSelector(authSelector);
  // Falta mostrar si es publica
  const { title, followedBy, owner, type, _id } = playLists[playListId];

  // const handlePlayPlayList = () => {
  //   dispatch(playPlayList(_id));
  // };

  // const handlePlayListEdit = () => {
  //   setIsEditSong(!isEditSong);
  //   setMenuOpen(!menuOpen);
  // };

  const handleRemovePlayList = () => {
    dispatch(deletePlayList(_id));
  };

  // const handleSubmitEditForm = (formValues) => {
  //   dispatch(editMySong({ ...formValues, songId: _id }));
  //   setIsEditSong(false);
  // };

  return (
    <section className="p-2">
      <div className="p-4 flex space-x-4 card-song">
        {/* <button
          type="button"
          className="w-24 h-24 image-container"
          onClick={handlePlayPlayList}
        >
          <div className="flex items-center justify-center absolute w-24 h-24 img-play">
            <i className="bx bx-play text-4xl" />
          </div>
          <img
            src={image}
            alt=""
            className="w-24 h-24 rounded-4 object-cover "
          />
        </button> */}
        <div className="pr-20 info-container truncate">
          <h2 className="text-lg font-semibold text-light mb-0.5 ">{title}</h2>
          <div className="flex-none w-full mt-0.5 font-normal">
            <dt className="sr-only">Owner</dt>
            <dd>{owner}</dd>
          </div>
          <dl className="flex flex-wrap items-center text-sm font-medium whitespace-pre">
            <div className="pr-4">
              <dt className="sr-only">Type</dt>
              <dd>{type}</dd>
            </div>
            <div className="pr-4">
              <dt className="sr-only">Public</dt>
              <dd>Public</dd>
            </div>
            <div className="pr-4">
              <dt className="sr-only">Follow</dt>
              <dd>{followedBy.length} Followed</dd>
            </div>
          </dl>
        </div>

        <button type="button" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="bx bx-dots-vertical-rounded text-2xl" />
        </button>
        <nav
          className={
            menuOpen
              ? 'absolute flex flex-col nav-song shadow-xl'
              : 'hidden absolute'
          }
        >
          {owner === userId && <button type="button">Edit</button>}

          {owner === userId && (
            <button type="button" onClick={handleRemovePlayList}>
              Remove
            </button>
          )}
          <button type="button">Follow</button>
          <button type="button">Add to queqe</button>
        </nav>
      </div>
      <Modal>
        {/*       <SongForm
          songTitle={title}
          songArtist={artist}
          songGenre={genre}
          defaultImg={image}
          handleSubmit={handleSubmitEditForm}
          handleCancel={() => setIsEditSong(false)}
          isLoading={false}
        /> */}
      </Modal>
    </section>
  );
};

PlayListCard.propTypes = {
  playListId: PropTypes.string.isRequired,
};
