/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {ImagesContainer} from './src/containers/ImagesContainer';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ImagesContainer />
    </Provider>
  );
};

export default App;
