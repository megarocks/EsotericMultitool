/**
 * Created by vitalii.kyktov on 3/10/17.
 */

import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import EsotericMultitool from './EsotericMultitool';

import {Drawer, Text} from 'native-base';

import SideMenu from '../features/SideMenu';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

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
                        content={ <SideMenu />}
                        onClose={()=>this.closeDrawer()}>
                    <EsotericMultitool />
                </Drawer>
            </Provider>
        );
    }
}

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 1, shadowRadius: 3},
    main: {paddingLeft: 3},
}