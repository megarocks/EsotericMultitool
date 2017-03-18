/**
 * Created by vitalii.kyktov on 3/10/17.
 */

import React, {Component} from 'react';
import { Router, Scene } from 'react-native-router-flux';

import ContactsListScene from './ContactsListScene'
import PersonDetailsScene from '../features/contacts/PersonDetailsScene'
import TodayScene from './TodayScene'
import DateReduce from './DateReduceScene'

export default class EsotericMultitool extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="todayScene" component={TodayScene} title="Today" initial={true} type="reset" />
                    <Scene key="contactsList" component={ContactsListScene} title="Contacts" type="reset" />
                    <Scene key="dateReduce" component={DateReduce} title="Date Reduce" type="reset" />
                    <Scene key="personDetails" component={PersonDetailsScene} />
                </Scene>
            </Router>
        )
    }
}