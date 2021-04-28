import React from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';

import { useDispatch, useSelector } from 'react-redux';
import { saveIndexPlayList } from '../../redux/player/player-actions';
import { playerSelector } from '../../redux/player/player-selectors';
import { selectSongByIdState } from '../../redux/song/song-selectors';

import LikeButton from '../LikeButton';

import 'react-h5-audio-player/lib/styles.css';
import './Player.scss';

export const Player = () => {
  const dispatch = useDispatch();
  const { currentIndexPlayList, currentPlayList } = useSelector(playerSelector);
  const song = useSelector(
    selectSongByIdState(currentPlayList[currentIndexPlayList]),
  );
  const { title, artist, likedBy, _id, url } = song;
  const handleNext = () => {
    if (currentIndexPlayList === currentPlayList.length - 1) {
      dispatch(saveIndexPlayList(0));
    } else {
      dispatch(saveIndexPlayList(currentIndexPlayList + 1));
    }
  };
  const handlePrevious = () => {
    if (currentIndexPlayList === 0) {
      dispatch(saveIndexPlayList(0));
    } else {
      dispatch(saveIndexPlayList(currentIndexPlayList - 1));
    }
  };
  const handleModalSong = () => {};

  return (
    <section className="w-full flex flex-col items-center bg-black fixed bottom-0 pt-2 z-10 ">
      <div className="w-full justify-center bg-black flex items-center">
        <div className="w-full flex text-l items-center justify-around">
          <button type="button" onClick={handleModalSong} className="flex">
            <h2 className="text-l font-semibold text-light">{title} -</h2>
            <h3 className="text-m font-normal text-light">&nbsp;{artist}</h3>
          </button>
          <LikeButton likedBy={likedBy} songId={_id} />
        </div>
      </div>
      <div className="w-full">
        <AudioPlayer
          src={url}
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
