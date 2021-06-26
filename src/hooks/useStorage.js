import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStorage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);

  const get = key => {
    setIsLoading(true);
    AsyncStorage.getItem(key)
      .then(response => {
        setIsLoading(false);
        setResponse(response);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
      });
  };

  return {get, isLoading, response, error};
};

export default useStorage;
