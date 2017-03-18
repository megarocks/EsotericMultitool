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