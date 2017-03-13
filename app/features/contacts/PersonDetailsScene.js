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
  Card,
  CardItem
} from 'native-base';
import moment from 'moment'

import {
  convertBirthdayObjectToDate,
  getNextBirthday
} from '../../utils/birthdayDataService';

import reduceDate from '../../utils/reduceDate';
import { getZodiacData } from '../../utils/zodiac';

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
          { this.renderBirthdayInfo() }
          { this._renderZodiacInfo() }
        </Content>
      </Container>
    );
  }

  renderBirthdayInfo = (): Card => {
    const { birthday } = this.state;
    return (
      <Card>
        <CardItem itemHeader first><Text>Birthday</Text></CardItem>
        <CardItem>
          <Text>Birthday: {moment(birthday).format('D MMM YYYY')}</Text>
        </CardItem>
        <CardItem>
          <Text>Next bDay: {getNextBirthday(birthday).fromNow()}</Text>
        </CardItem>
        <CardItem>
          <Text>Reduced Birthday: {reduceDate(birthday.toDate())}</Text>
        </CardItem>
        <CardItem last>
          <Text>Age: {moment().diff(birthday, 'years', true).toFixed(2)}</Text>
        </CardItem>
      </Card>
    )
  };

  _renderZodiacInfo = (): Card => {
    const { birthday } = this.state;
    const zodiacData =  getZodiacData(birthday);

    return (
      <Card>
        <CardItem header><Text>Zodiac</Text></CardItem>
        <CardItem>
          <Text>Sign: { zodiacData.sign } { zodiacData.symbol }</Text>
        </CardItem>
        <CardItem last>
          <Text>Element: { zodiacData.element }</Text>
        </CardItem>
      </Card>
    )
  }

}

