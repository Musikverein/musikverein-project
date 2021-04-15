import axios from 'axios';

export async function imageUpload(file) {
  const formData = new FormData();
  formData.append('upload_preset', 'musikverein');
  formData.append('file', file);

  const response = await axios.post(process.env.REACT_APP_CLOUDINARY_IMG_URL, {
    body: formData,
  });
  return response.secure_url;
}
