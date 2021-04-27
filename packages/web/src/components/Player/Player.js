import React from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';

import { useDispatch, useSelector } from 'react-redux';
import { saveIndexPlaylist } from '../../redux/player/player-actions';
import { playerSelector } from '../../redux/player/player-selectors';
import { songSelector } from '../../redux/song/song-selectors';

import LikeButton from '../LikeButton';

import 'react-h5-audio-player/lib/styles.css';
import './Player.scss';

export const Player = () => {
  const dispatch = useDispatch();
  const { currentIndexPlaylist, currentPlaylist } = useSelector(playerSelector);
  const { songs } = useSelector(songSelector);

  const handleNext = () => {
    if (currentIndexPlaylist === currentPlaylist.length - 1) {
      dispatch(saveIndexPlaylist(0));
    } else {
      dispatch(saveIndexPlaylist(currentIndexPlaylist + 1));
    }
  };
  const handlePrevious = () => {
    if (currentIndexPlaylist === 0) {
      dispatch(saveIndexPlaylist(0));
    } else {
      dispatch(saveIndexPlaylist(currentIndexPlaylist - 1));
    }
  };
  const handleModalSong = () => {};

  return (
    <section className="w-full flex flex-col items-center bg-black fixed bottom-0 pt-2 z-10 ">
      <div className="w-full justify-center bg-black flex items-center">
        <div className="w-full flex text-l items-center justify-around">
          <button type="button" onClick={handleModalSong} className="flex">
            <h2 className="text-l font-semibold text-light">
              {songs[currentPlaylist[currentIndexPlaylist]].title} -
            </h2>
            <h3 className="text-m font-normal text-light">
              &nbsp;{songs[currentPlaylist[currentIndexPlaylist]].artist}
            </h3>
          </button>
          <LikeButton
            likedBy={songs[currentPlaylist[currentIndexPlaylist]].likedBy}
            songId={songs[currentPlaylist[currentIndexPlaylist]]._id}
          />
        </div>
      </div>
      <div className="w-full">
        <AudioPlayer
          src={songs[currentPlaylist[currentIndexPlaylist]]?.url}
          showSkipControls
          autoPlay
          showJumpControls={false}
          onClickNext={handleNext}
          onClickPrevious={handlePrevious}
          onEnded={handleNext}
          style={{ backgroundColor: 'black', color: 'white' }}
          customAdditionalControls={[
            RHAP_UI.LOOP,
            <button type="button" key="x" className="bx bx-list-ul text-4xl" />,
          ]}
        />
      </div>
    </section>
  );
};
