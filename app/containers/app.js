/**
 * Created by vitalii.kyktov on 3/10/17.
 */

import React, {Component} from 'react';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'

import * as reducers from '../reducers';
import EsotericMultitool from './EsotericMultitool';

import {Drawer} from 'native-base';

import SideMenu from '../features/SideMenu';
import moment from 'moment';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
//const store = createStoreWithMiddleware(reducer);
const store = createStore(
  reducer,
  undefined,
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);

persistStore(store, {storage: AsyncStorage, whitelist: ['settings']});

export default class App extends Component {

  closeDrawer = () => {
    this._drawer._root.close()
  };
  openDrawer = () => {
    this._drawer._root.open()
  };

  componentDidMount = () => {

    moment.relativeTimeThreshold('m', 1440);

    moment.updateLocale('en', {
      relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s: function (number, withoutSuffix, key, isFuture){
          return '00:' + (number<10 ? '0':'') + number + ' minutes';
        },
        m:  "01:00 minutes",
        mm: function (number, withoutSuffix, key, isFuture){
          const hours = Math.floor(number/60);
          const minutes = number % 60;
          return `${hours} hours ${minutes} minutes`;
        },
        h:  "an hour",
        hh: "%d hours",
        d:  "a day",
        dd: "%d days",
        M:  "a month",
        MM: "%d months",
        y:  "a year",
        yy: "%d years"
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Drawer ref={(ref) => { this._drawer = ref; }}
                styles={drawerStyles}
                content={ <SideMenu closeDrawerFunction={this.closeDrawer} />}
                onClose={()=>this.closeDrawer()}>
          <EsotericMultitool />
        </Drawer>
      </Provider>
    );
  }
}

const drawerStyles = {
  drawer: {shadowColor: '#000000', shadowOpacity: 1, shadowRadius: 3},
  main: {paddingLeft: 3},
}