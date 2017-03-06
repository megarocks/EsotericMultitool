/*
 @flow

 */

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Contacts from 'react-native-unified-contacts';
import DateReduce from './features/dateReduce/DateReduce';
import { Container, Header, Body, Title, Content, ListItem, Text } from 'native-base';


import reduceDate from './utils/reduceDate';
import biorythm from './utils/biorythm';

export default class ContactsListScene extends Component {
  constructor(props: Object) {
    super(props);
  }

  state = {
    contacts: []
  };

  static defaultProps = {};
  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const self = this;
    Contacts.requestAccessToContacts((userCanAccessContacts) => {
      if (userCanAccessContacts) {
        console.log("User has access to Contacts!");
        Contacts.getContacts((error, contacts) => {
          if (error) {
            console.error(error);
          }
          else {
            console.log(contacts);
            self.setState({contacts}); // TODO use caching
          }
        });
      }
      else {
        console.log("User DOES NOT have access to Contacts!");
      }
    });
  }

  render() {
    const {contacts} = this.state;
    console.log('contacts in render:', contacts);
    return (
      <Container>
        <Header>
          <Body>
            <Title>Contacts</Title>
          </Body>
        </Header>
        <Content>
          {
            contacts.map((person, index) => (
              <ListItem key={index}>
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
    const { fullName, birthday } = personObj;
    if (!birthday || !birthday.year) return fullName;

    const reducedDate = reduceDate(this._convertBirthdayToDate(birthday));
    return `${fullName} (${reducedDate})`
  };

  _getPersonBiorhythms = (personObj: Object): any => {
    const { birthday } = personObj;
    if (!birthday || !birthday.year) return null;

    const biorythmData = biorythm(this._convertBirthdayToDate(birthday), new Date());

    const { physical, emotion, intellect, intuition } = biorythmData;
    return `P: ${physical}, E: ${emotion}, IT: ${intellect}, IN: ${intuition}`;
  };

  _renderSubtitle = (birthday: Object): any => {
    return (
      <View>
        {
          (birthday && birthday.year)
            ? <DateReduce date={ this._convertBirthdayToDate(birthday) } />
            : null
        }
      </View>
    )
  };

  _convertBirthdayToDate = (birthdayObj: Object): any => {
    const {year, month, day} = birthdayObj;
    return new Date(year, month - 1, day)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 20
  },
});
