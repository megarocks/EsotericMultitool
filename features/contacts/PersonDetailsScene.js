/**
 * Created by alt on 3/6/17.
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  List,
  ListItem
} from 'native-base';
import moment from 'moment'

import {
  convertBirthdayObjectToDate,
  getNextBirthday
} from '../../utils/birthdayDataService';

import reduceDate from '../../utils/reduceDate';

export default class PersonDetailsScene extends Component {
  constructor(props: Object) {
    super(props);

    const birthday = convertBirthdayObjectToDate(this.props.person.birthday);
    this.state = {
      birthday
    }
  }

  state = {};
  static defaultProps = {};
  static propTypes = {
    title: PropTypes.string.isRequired,
    person: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  componentDidMount() {

  }

  render() {
    const { person } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.props.onBack}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{person.fullName}</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          { this.renderBirthdayInfo(person) }
        </Content>
      </Container>
    );
  }

  renderBirthdayInfo = (): List => {
    const { birthday } = this.state;
    return (
      <List>
        <ListItem itemHeader first><Text>Birthday</Text></ListItem>
        <ListItem>
          <Text>Birthday: {moment(birthday).format('D MMM YYYY')}</Text>
        </ListItem>
        <ListItem>
          <Text>Next bDay: {getNextBirthday(birthday).fromNow()}</Text>
        </ListItem>
        <ListItem>
          <Text>Reduced Birthday: {reduceDate(birthday.toDate())}</Text>
        </ListItem>
        <ListItem last>
          <Text>Age: {moment().diff(birthday, 'years', true).toFixed(2)}</Text>
        </ListItem>
      </List>
    )
  };

  _renderZodiacInfo = (person: Object): List => {

  }

}

