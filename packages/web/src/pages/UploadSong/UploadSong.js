import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import { uploadSong } from '../../redux/song/song-actions';
import { UploadSongForm } from '../../components/UploadSongForm/UploadSongForm';
import { metaImgToBase64 } from '../../utils/utils';

export const UploadSong = () => {
  const jsmediatags = window.jsmediatags;

  const dispatch = useDispatch();

  const [loadSong, setLoadSong] = useState(null);
  const [metaSong, setMetaSong] = useState({});

  useEffect(() => {
    return () => {
      setLoadSong(null);
    };
  }, []);

  const handleSongLoad = async (file) => {
    jsmediatags.read(file, {
      onSuccess: ({ tags }) => {
        const cover = metaImgToBase64(tags.picture?.data, tags.picture?.format);
        setMetaSong({
          metaTitle: tags.title || '',
          metaArtist: tags.artist || '',
          metaGenre: tags.genre || '',
          defaultImg: cover,
        });
        setLoadSong(file);
      },
    });
  };

  const handleSubmit = ({ title, artist, genre, image, recaptchaToken }) => {
    dispatch(
      uploadSong({
        song: loadSong,
        title: title,
        artist: artist,
        genre: genre,
        image: image,
        recaptchaToken: recaptchaToken,
      }),
    );
  };

  return (
    <>
      <Header />
      <main className="main-container">
        <div className="h-full w-full flex flex-col justify-center items-center p-4">
          <h4>Upload Audio File</h4>
          {loadSong ? (
            <UploadSongForm {...metaSong} handleSubmit={handleSubmit} />
          ) : (
            <Dropzone
              onFileSelected={(files) => {
                // eslint-disable-next-line no-console
                handleSongLoad(files[0]);
              }}
            />
          )}
        </div>
      </main>
    </>
  );
};
