import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

import Header from '../../components/Header';

import './PlayListCreate.scss';
import {
  createPlayList,
  createPlayListReset,
} from '../../redux/libraryPlayList/libraryPlayList-actions';
import { validationSchema } from '../../utils/validation/validationSchema';
import { userPlayListSelector } from '../../redux/libraryPlayList/libraryPlayList-selectors';
import ROUTES from '../../routers/routes';
import { Spinner } from '../../components/Spinner/Spinner';

export const PlayListCreate = () => {
  const { formValues, handleInputChange, errors, isValid } = useForm({
    title: '',
    type: 'PlayList',
    publicPlayList: true,
  });

  const reRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isCreatingPlayList, createPlayListSuccess } = useSelector(
    userPlayListSelector,
  );

  const { title, type, publicPlayList } = formValues;

  if (createPlayListSuccess) {
    dispatch(createPlayListReset());
    history.push(ROUTES.LIBRARY_PLAYLISTS);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid(validationSchema.playList)) {
      const recaptchaToken = await reRef.current.executeAsync();
      reRef.current.reset();
      dispatch(createPlayList({ title, type, publicPlayList, recaptchaToken }));
    }
  };
  return (
    <>
      <Header />
      <main className="main-container">
        {isCreatingPlayList ? (
          <Spinner />
        ) : (
          <>
            <Link
              to={ROUTES.LIBRARY_PLAYLISTS}
              className="bx bxs-chevron-left text-4xl"
            />
            <form className="w-full p-4 flex flex-col" onSubmit={handleSubmit}>
              <input
                className="form__input rounded-4 "
                placeholder="Insert the name"
                name="title"
                onChange={handleInputChange}
                value={title}
              />
              <span className="mb-2 p-2 block text-error">
                {errors.title ? errors.title : ' '}
              </span>
              <label htmlFor="Type" className="my-4">
                Public
                <input
                  value={publicPlayList}
                  name="publicPlayList"
                  className="mx-2"
                  type="checkbox"
                  onChange={handleInputChange}
                />
              </label>
              <select
                className="playlist-select mb-4"
                name="type"
                value={type}
                onChange={handleInputChange}
              >
                <option value="Album">Album</option>
                <option value="PlayList">PlayList</option>
              </select>

              <button type="submit" className="button-primary rounded-4">
                Create
              </button>
            </form>
          </>
        )}
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_WEB_KEY}
          size="invisible"
          ref={reRef}
        />
      </main>
    </>
  );
};
