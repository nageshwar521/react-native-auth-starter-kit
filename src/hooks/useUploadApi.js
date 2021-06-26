import axios from 'axios';
import React from 'react';
import {useState} from 'react';

const useUploadApi = () => {
  const [uploadStatus, setUploadStatus] = useState('initial');
  const [uploadResponse, setUploadResponse] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const uploadImage = async ({file}) => {
    // console.log(file);
    setUploadStatus('loading');
    try {
      const response = await axios.post(
        'http://192.168.0.103:5000/api/users/ff82b3bd-e23a-4c7c-ba15-2c83ee0c2699',
        {file},
        {
          headers: {
            Authorization:
              'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hZ2VzaHdhciIsImlhdCI6MTYyNDI1MjQ4OSwiZXhwIjoxNjI0MjU2MDg5fQ.R1UurGnexCVaPJCYiUogM8iJp047UQ9X7CBLQHxyokY',
          },
        },
      );
      // console.log(response, 'response');
      setUploadStatus('success');
      setUploadResponse(response);
    } catch (error) {
      console.log(error, 'error');
      setUploadStatus('error');
      setUploadError(error);
    }
  };

  const resetUpload = () => {
    setUploadStatus('initial');
    setUploadResponse(null);
    setUploadError(null);
  };

  return {uploadImage, resetUpload, uploadStatus, uploadResponse, uploadError};
};

export default useUploadApi;
