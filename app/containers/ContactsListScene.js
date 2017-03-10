/*
 @flow

 */

import React, {Component, PropTypes} from 'react';
import Contacts from 'react-native-unified-contacts';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as contactActions from '../actions/contactActions';
import {Container, Header, Body, Title, Content, ListItem, Text} from 'native-base';


import reduceDate from '../utils/reduceDate';
import biorythm from '../utils/biorythm';

class ContactsListScene extends Component {
    constructor(props: Object) {
        super(props);
    }

    state = {
        contacts: []
    };

    static defaultProps = {};
    static propTypes = {
        title: PropTypes.string.isRequired,
        onPersonSelect: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const {actions} = this.props;
        Contacts.requestAccessToContacts((userCanAccessContacts) => {
            if (userCanAccessContacts) {
                actions.startFetching();
                console.log("User has access to Contacts!");
                Contacts.getContacts((error, contacts) => {
                    if (error) {
                        console.error(error);
                    }
                    else {
                        console.log(contacts);
                        actions.finishFetching(contacts);
                    }
                });
            }
            else {
                console.log("User DOES NOT have access to Contacts!");
            }
        });
    }

    render() {
        const {contacts} = this.props;
        const contactsWithBirthday = contacts.filter(contact => {
            return contact.birthday && contact.birthday.year;
        });
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Contacts</Title>
                    </Body>
                </Header>
                <Content>
                    {
                        contactsWithBirthday.map((person, index) => (
                            <ListItem key={index} onPress={this.props.onPersonSelect(person)}>
                                <Body>
                                <Text>{this._getPersonTitle(person)}</Text>
                                <Text note>{this._getPersonBiorhythms(person)}</Text>
                                </Body>
                            </ListItem>
                        ))
                    }
                </Content>
            </Container>
        );
    }

    _getPersonTitle = (personObj: Object): string => {
        const {fullName, birthday} = personObj;
        if (!birthday || !birthday.year) return fullName;

        const reducedDate = reduceDate(this._convertBirthdayToDate(birthday));
        return `${fullName} (${reducedDate})`
    };

    _getPersonBiorhythms = (personObj: Object): any => {
        const {birthday} = personObj;
        if (!birthday || !birthday.year) return null;

        const biorythmData = biorythm(this._convertBirthdayToDate(birthday), new Date());

        const {physical, emotion, intellect, intuition} = biorythmData;
        return `P: ${physical}, E: ${emotion}, IT: ${intellect}, IN: ${intuition}`;
    };

    _convertBirthdayToDate = (birthdayObj: Object): any => {
        const {year, month, day} = birthdayObj;
        return new Date(year, month - 1, day)
    }

}

export default connect(state => ({
        contacts: state.contacts.contacts
    }),
    (dispatch) => ({
        actions: bindActionCreators(contactActions, dispatch)
    })
)(ContactsListScene)


