import React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from '../../routes';

export const SearchButton = () => {
  return (
    <div>
      <Link to={ROUTES.SEARCH} className="bx bx-search text-4xl" />
    </div>
  );
};
