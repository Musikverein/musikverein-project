import React from 'react';
import { renderWithReduxAndRouter } from '../../../utils/test-utils';
import { UploadSong } from '../UploadSong';

describe('<UploadSong> behavior', () => {
  test('should render correctly', () => {
    const { getByText } = renderWithReduxAndRouter(<UploadSong />);

    expect(
      getByText('Drag n drop some files here, or click to select files', {
        exact: false,
      }),
    ).toBeInTheDocument();
    expect(
      getByText('Terms and Conditions of Use', { exact: false }),
    ).toBeInTheDocument();
  });
});
