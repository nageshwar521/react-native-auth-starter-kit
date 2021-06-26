import * as React from 'react';

export const toasterRef = React.createRef();

export const toaster = () => {
  return toasterRef.current;
};
