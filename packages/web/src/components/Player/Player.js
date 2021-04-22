import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export const Player = ({ playList }) => {
  const [indexPlayList, setIndexPlayList] = useState(0);

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
    <section className="w-full flex items-center bg-black fixed bottom-0">
      <button
        type="button"
        onClick={handleModalSong}
        className="w-1/3 bg-black flex items-center"
      >
        <div className="w-full h-full">
          <img
            src={playList[indexPlayList].image}
            alt={playList[indexPlayList].title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2>{playList[indexPlayList].title}</h2>
          <h3>{playList[indexPlayList].artist}</h3>
        </div>
      </button>
      <div className="w-2/3">
        <AudioPlayer
          src={playList[indexPlayList]?.url}
          showSkipControls
          showJumpControls={false}
          layout="horizontal"
          onClickNext={handleNext}
          onClickPrevious={handlePrevious}
          onEnded={handleNext}
          style={{ backgroundColor: 'black' }}
        />
      </div>
    </section>
  );
};
Player.propTypes = {
  playList: PropTypes.array.isRequired,
};
