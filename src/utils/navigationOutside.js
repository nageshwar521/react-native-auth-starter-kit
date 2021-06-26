import * as React from 'react';

export const navigationRef = React.createRef();

export const navigateOutside = (name, params) => {
  // console.log('navigate name');
  // console.log(name);
  // console.log(navigationRef);
  navigationRef.current?.navigate(name, params);
};
