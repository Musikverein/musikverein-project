import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';

import { useDispatch, useSelector } from 'react-redux';
import { saveIndexPlaylist } from '../../redux/player/player-actions';
import { playerSelector } from '../../redux/player/player-selectors';

import LikeButton from '../LikeButton';

import 'react-h5-audio-player/lib/styles.css';
import './Player.scss';

export const Player = ({ playList }) => {
  const dispatch = useDispatch();
  const { currentIndexPlaylist } = useSelector(playerSelector);
  const [indexPlayList, setIndexPlayList] = useState(currentIndexPlaylist);

  // TODO: player reset currentIndexPlaylist when change playlist

  useEffect(() => {
    dispatch(saveIndexPlaylist(indexPlayList));
  }, [dispatch, indexPlayList]);

  const handleNext = () => {
    if (indexPlayList === playList.length - 1) {
      setIndexPlayList(0);
    } else {
      setIndexPlayList(indexPlayList + 1);
    }
  };
  const handlePrevious = () => {
    if (indexPlayList === 0) {
      setIndexPlayList(0);
    } else {
      setIndexPlayList(indexPlayList - 1);
    }
  };
  const handleModalSong = () => {};

  return (
    <section className="w-full flex flex-col items-center bg-black fixed bottom-0 pt-2 z-10 ">
      <div className="w-full justify-center bg-black flex items-center">
        {/* <div className="w-full h-full">
          <img
            src={playList[indexPlayList].image}
            alt={playList[indexPlayList].title}
            className="w-full h-full object-cover"
          />
        </div> */}
        <div className="w-full flex text-l items-center justify-around">
          <button type="button" onClick={handleModalSong} className="flex">
            <h2 className="text-l font-semibold text-light">
              {playList[indexPlayList].title} -
            </h2>
            <h3 className="text-m font-normal text-light">
              &nbsp;{playList[indexPlayList].artist}
            </h3>
          </button>
          <LikeButton />
        </div>
      </div>
      <div className="w-full">
        <AudioPlayer
          src={playList[indexPlayList]?.url}
          showSkipControls
          showJumpControls={false}
          onClickNext={handleNext}
          onClickPrevious={handlePrevious}
          onEnded={handleNext}
          style={{ backgroundColor: 'black' }}
          customAdditionalControls={[
            RHAP_UI.LOOP,
            <button type="button" key="x" className="bx bx-list-ul text-4xl" />,
          ]}
        />
      </div>
    </section>
  );
};
Player.propTypes = {
  playList: PropTypes.array.isRequired,
};
