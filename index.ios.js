/**
 * EsotericMultitool React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import DateReduceScene from './DateReduceScene'
import ContactsListScene from './ContactsListScene'
import PersonDetailsScene from './features/contacts/PersonDetailsScene'

export default class EsotericMultitool extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Contacts', index: 0 }}
        renderScene={(route, navigator) => {

          if (route.title === 'Contacts') {
            return <ContactsListScene title={route.title}
                      onPersonSelect={ (person) => () => {
                        console.log(person);
                        navigator.push({
                          title: 'Person Details',
                          person,
                          index: route.index + 1
                        })
                      }
                     }/>
          }
          if (route.title === 'Person Details') {
            return <PersonDetailsScene title={route.title} person={route.person}
                     onBack={ () => route.index > 0 && navigator.pop() } />
          }
      }}
      />);
  }
}

AppRegistry.registerComponent('EsotericMultitool', () => EsotericMultitool);
