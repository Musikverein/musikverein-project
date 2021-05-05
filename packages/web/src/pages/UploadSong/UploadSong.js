import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  uploadSong,
  uploadSongReset,
} from '../../redux/librarySongs/librarySong-actions';

import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import SongForm from '../../components/SongForm';

import { metaImgToBase64 } from '../../utils/utils';
import { librarySongSelector } from '../../redux/librarySongs/librarySong-selectors';
import ROUTES from '../../routers/routes';

export const UploadSong = () => {
  const jsmediatags = window.jsmediatags;

  const { isUploadingSong, uploadSongSuccess } = useSelector(
    librarySongSelector,
  );
  const dispatch = useDispatch();

  const [loadSong, setLoadSong] = useState(null);
  const [metaSong, setMetaSong] = useState({});

  useEffect(() => {
    dispatch(uploadSongReset());
    return () => {
      setLoadSong(null);
    };
  }, [dispatch]);

  useEffect(() => {
    if (uploadSongSuccess) {
      setLoadSong(null);
    }
  }, [uploadSongSuccess]);

  const handleSongLoad = async (file) => {
    jsmediatags.read(file, {
      onSuccess: ({ tags }) => {
        const cover = metaImgToBase64(tags.picture?.data, tags.picture?.format);
        setMetaSong({
          songTitle: tags.title || '',
          songArtist: tags.artist || '',
          songGenre: tags.genre || '',
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
      <main className="main-container px-4">
        <div className="h-full w-full flex flex-col justify-center items-center p-4">
          <h4 className="text-2xl py-4">Upload Audio File</h4>
          {loadSong ? (
            <SongForm
              {...metaSong}
              handleSubmit={handleSubmit}
              isLoading={isUploadingSong}
              handleCancel={() => setLoadSong(null)}
            />
          ) : (
            <Dropzone
              onFileSelected={(files) => {
                // eslint-disable-next-line no-console
                handleSongLoad(files[0]);
              }}
            />
          )}
        </div>
        <p className="text-sm text-gray-400 text-center px-8">
          Uploading a song, you agree to Musikverein&apos;s&nbsp;
          <br />
          <Link
            className="text-sm underline hover:text-gray-200"
            to={ROUTES.TOS}
          >
            Terms and Conditions of Use.
          </Link>
        </p>
      </main>
    </>
  );
};
