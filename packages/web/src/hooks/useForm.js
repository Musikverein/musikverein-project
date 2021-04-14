import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputChange = ({ target }) =>
    setFormValues({ ...formValues, [target.name]: target.value });

  const resetForm = () => setFormValues(initialState);

  const errorFormater = (array, key = 'path') => {
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item.message,
      };
    }, {});
  };

  const isValid = (schema) => {
    const { error } = schema.validate(formValues, {
      abortEarly: false,
    });

    if (error) {
      setErrors(errorFormater(error.details));

      return false;
    }
    setErrors({});
    return true;
  };

  return {
    formValues,
    handleInputChange,
    resetForm,
    isValid,
    errors,
    errorFormater,
  };
};
