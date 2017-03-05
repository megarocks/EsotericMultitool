/*
 @flow

 */

import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Contacts from 'react-native-unified-contacts';
import {List, ListItem} from 'react-native-elements';
import DateReduce from './features/dateReduce/DateReduce';



import reduceDate from './utils/reduceDate';

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
      <View style={styles.container}>
        <List>
          {
            contacts.map((person, index) => (
              <ListItem key={index}
                        title={this._getPersonTitle(person)}

              />))
          }
        </List>
      </View>
    );
  }

  _getPersonTitle = (personObj: Object): string => {
    const { fullName, birthday } = personObj;
    if (!birthday || !birthday.year) return fullName;

    const reducedDate = reduceDate(this._convertBirthdayToDate(birthday));
    return `${fullName} (${reducedDate})`
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
