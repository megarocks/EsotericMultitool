/**
 * Created by vitalii.kyktov on 3/10/17.
 */

import React, {Component} from 'react';
import { Router, Scene } from 'react-native-router-flux';

import ContactsListScene from './ContactsListScene'
import PersonDetailsScene from '../features/contacts/PersonDetailsScene'

export default class EsotericMultitool extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="contactsList" component={ContactsListScene} title="Contacts" initial={true} />
                    <Scene key="personDetails" component={PersonDetailsScene} title="Person Details" />
                </Scene>
            </Router>
        )
    }
}