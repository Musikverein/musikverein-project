import React, { useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { useDispatch, useSelector } from 'react-redux';
import { saveIndexPlayList } from '../../redux/player/player-actions';
import { playerSelector } from '../../redux/player/player-selectors';
import { selectSongByIdState } from '../../redux/song/song-selectors';

import LikeButton from '../LikeButton';

import 'react-h5-audio-player/lib/styles.css';
import './Player.scss';
import { ModalLayout } from '../ModalLayout/ModalLayout';
import { SongCard } from '../SongCard/SongCard';

export const Player = () => {
  const dispatch = useDispatch();
  const { currentIndexPlayList, currentPlayList } = useSelector(playerSelector);
  const song = useSelector(
    selectSongByIdState(currentPlayList[currentIndexPlayList]),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleModalPlayList = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePlaySpecificSong = (songId) => {
    // dispatch(playSpecificSong(songId));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(currentPlayList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    console.log({ items });
  };

  return (
    <section className="w-full flex flex-col items-center bg-black fixed bottom-0 pt-2 z-10 ">
      <div className="w-full justify-center bg-black flex items-center">
        <div className="w-full flex text-l items-center justify-around">
          <button type="button" onClick={handleModalSong} className="flex">
            <h2 className="text-l font-semibold text-light">{title} -</h2>
            <h3 className="text-m font-normal text-light">&nbsp;{artist}</h3>
          </button>
          <LikeButton likedBy={likedBy} songId={_id} text={false} />
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
            <button
              type="button"
              key="x"
              className="bx bx-list-ul text-4xl"
              onClick={handleModalPlayList}
            />,
          ]}
        />
      </div>
      <ModalLayout isOpen={isModalOpen} handleClose={handleModalPlayList}>
        <div className="w-full h-full px-4 text-white pt-12">
          <h2 className="py-4 text-2xl">Queue</h2>
          <div className="pb-4">
            <h3>Now playing:</h3>
            <SongCard
              songId={currentPlayList[currentIndexPlayList]}
              handlePlay={() => {}}
              playListId=""
            />
          </div>
          <div>
            <h3>Playlist:</h3>
            <div>
              <div className="playlist-songs">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="songs">
                    {(provided) => (
                      <ul
                        className="songs"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {currentPlayList.map((songId, index) => (
                          <Draggable
                            key={songId}
                            draggableId={songId}
                            index={index}
                          >
                            {(prov) => (
                              <li
                                key={songId}
                                ref={prov.innerRef}
                                {...prov.draggableProps}
                                {...prov.dragHandleProps}
                              >
                                <SongCard
                                  key={songId}
                                  songId={songId}
                                  handlePlay={() =>
                                    handlePlaySpecificSong({ songId: songId })
                                  }
                                  playListId=""
                                />
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
      </ModalLayout>
    </section>
  );
};
