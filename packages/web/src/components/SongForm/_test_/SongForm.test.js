import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import SongForm from '..';
import { renderWithReduxAndRouter } from '../../../utils/test-utils';

describe('<SongForm> behavior', () => {
  test('should render correctly', () => {
    const initalProps = {
      songTitle: 'tripaloski',
      songArtist: 'KOLM TRIIPU',
      defaultImg: '',
      handleSubmit: jest.fn,
      handleCancel: jest.fn,
      isLoading: false,
    };
    const { getByText, container } = renderWithReduxAndRouter(
      <SongForm {...initalProps} />,
    );

    expect(container.querySelector('#title').value).toBe(initalProps.songTitle);
    expect(container.querySelector('#artist').value).toBe(
      initalProps.songArtist,
    );
    expect(container.querySelector('select').value).toBe('default');

    expect(
      getByText('Submit', {
        exact: false,
      }),
    ).toBeInTheDocument();
    expect(getByText('Cancel', { exact: false })).toBeInTheDocument();
  });

  test('should called cancel', async () => {
    const initalProps = {
      songTitle: 'tripaloski',
      songArtist: 'KOLM TRIIPU',
      defaultImg: '',
      handleSubmit: jest.fn(),
      handleCancel: jest.fn(),
      isLoading: false,
    };
    const { getByText } = renderWithReduxAndRouter(
      <SongForm {...initalProps} />,
    );

    fireEvent.click(getByText('Cancel', { exact: false }));

    await waitFor(() => {
      expect(initalProps.handleCancel).toBeCalled();
    });
  });

  test('should message in validation genre', async () => {
    const initalProps = {
      songTitle: 'tripaloski',
      songArtist: 'KOLM TRIIPU',
      defaultImg: '',
      handleSubmit: jest.fn(),
      handleCancel: jest.fn(),
      isLoading: false,
    };
    const { getByText } = renderWithReduxAndRouter(
      <SongForm {...initalProps} />,
    );

    fireEvent.click(getByText('Submit', { exact: false }));

    await waitFor(() => {
      expect(
        getByText('"genre" length must be at least 9 characters long', {
          exact: false,
        }),
      ).toBeInTheDocument();
    });
  });
});
