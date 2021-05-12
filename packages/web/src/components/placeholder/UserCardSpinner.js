import React from 'react';
import ContentLoader from 'react-content-loader';

const UserCardSpinner = (props) => (
  <ContentLoader
    speed={1}
    width={400}
    viewBox="0 0 550 160"
    backgroundColor="#a3a3a3"
    foregroundColor="#6b6b6b"
    {...props}
  >
    <rect x="100" y="29" rx="3" ry="3" width="163" height="18" />
    <circle cx="37" cy="36" r="35" />
  </ContentLoader>
);

export default UserCardSpinner;
