import { useState } from 'react';

export const useImgPreview = (refId) => {
  const [stateImg, setStateImg] = useState({
    urlPreview: '',
    file: null,
  });
  const { urlPreview } = stateImg;

  const handleImage = () => {
    if (urlPreview) {
      document.querySelector(`#${refId}`).value = '';
      setStateImg({ file: null, urlPreview: '' });
    } else {
      document.querySelector(`#${refId}`).click();
    }
  };

  const handleImageChange = (e) => {
    const currentFile = e.target.files[0];
    if (currentFile) {
      const reader = new FileReader();

      reader.addEventListener('load', function readerFiles() {
        setStateImg({ file: currentFile, urlPreview: reader.result });
      });
      reader.readAsDataURL(currentFile);
    } else {
      setStateImg({ file: null, urlPreview: '' });
    }
  };

  return { stateImg, handleImageChange, handleImage, refId };
};
