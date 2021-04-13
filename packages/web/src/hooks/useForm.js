import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = ({ target }) =>
    setFormValues({ ...formValues, [target.name]: target.value });

  const resetForm = () => setFormValues(initialState);

  return [formValues, handleInputChange, resetForm];
};
