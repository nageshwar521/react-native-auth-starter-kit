export const getSuccessPayload = ({message = 'Success', data = null}) => {
  return {message, data};
};

export const getErrorPayload = ({message = 'Error', error = null}) => {
  return {message, error};
};

export const getAction = (name, ext) => {
  return `${name}_${ext}`;
};
