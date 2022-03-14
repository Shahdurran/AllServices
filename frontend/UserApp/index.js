/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import {AllServiceStore}  from './src/redux/store';


const RNRedux = () => {
  return(
  <Provider store = {AllServiceStore}>
    <App />
  </Provider>
  )
}

AppRegistry.registerComponent(appName, () => RNRedux);
