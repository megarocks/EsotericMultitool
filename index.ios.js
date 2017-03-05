/**
 * EsotericMultitool React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';
import DateReduceScene from './DateReduceScene'
import ContactsListScene from './ContactsListScene'

export default class EsotericMultitool extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Date Reduce', index: 0 }}
        renderScene={(route, navigator) => {
        return <ContactsListScene
         title={route.title}
         // Function to call when a new scene should be displayed
            onForward={() => {
              const nextIndex = route.index + 1;
              navigator.push({
                title: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}

            // Function to call to go back to the previous scene
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
         />
      }}
    />);
  }
}

AppRegistry.registerComponent('EsotericMultitool', () => EsotericMultitool);
