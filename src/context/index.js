import React from 'react';

export const ExoContext = React.createContext({});

export const contextWrapper = WrappedComponent => ({ ...value }) => (
  <ExoContext.Consumer>
    {state => <WrappedComponent {...state} {...value} />}
  </ExoContext.Consumer>
);
