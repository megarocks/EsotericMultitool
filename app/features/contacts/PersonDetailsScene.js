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
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';

import {
  convertBirthdayObjectToDate,
  convertUserBirthSettingsToMoment,
  getNextBirthday
} from '../../utils/birthdayDataService';

import reduceDate from '../../utils/reduceDate';
import { getZodiacData } from '../../utils/zodiac';
import biorythm from '../../utils/biorythm';

class PersonDetailsScene extends Component {
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
    person: PropTypes.object.isRequired,
    userBirthday: PropTypes.object.isRequired,
  };

  render() {
    const { person } = this.props;
    console.log(this.props.userBirthday);
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={Actions.pop}>
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
          { this._renderBiorythmInfo() }
          { this._renderBiorythmPhaseShiftInfo() }
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

  //TODO extract to component
  _renderBiorythmInfo = (): Card => {
    const { birthday } = this.state;
    const biorythmData =  biorythm(birthday, moment());

    return (
      <Card>
        <CardItem header><Text>Biorythms ( -100% .. +100% )</Text></CardItem>
        <CardItem>
          <Text>Physical: {biorythmData.physical }</Text>
        </CardItem>
        <CardItem>
          <Text>Emotional: {biorythmData.emotion }</Text>
        </CardItem>
        <CardItem>
          <Text>Intellectual: {biorythmData.intellect }</Text>
        </CardItem>
        <CardItem>
          <Text>Intuition: {biorythmData.intuition }</Text>
        </CardItem>
        <CardItem>
          <Text>Average: {biorythmData.average }</Text>
        </CardItem>
      </Card>
    )
  }

  _renderBiorythmPhaseShiftInfo = (): Card => {
    const { birthday } = this.state;
    const { userBirthday } = this.props;
    const biorythmData =  biorythm(birthday, userBirthday);

    return (
      <Card>
        <CardItem header><Text>Phase Shift ( 100% .. 0% )</Text></CardItem>
        <CardItem>
          <Text>Physical: { Math.abs(biorythmData.physical) }</Text>
        </CardItem>
        <CardItem>
          <Text>Emotional: { Math.abs(biorythmData.emotion) }</Text>
        </CardItem>
        <CardItem>
          <Text>Intellectual: { Math.abs(biorythmData.intellect) }</Text>
        </CardItem>
        <CardItem>
          <Text>Intuition: { Math.abs(biorythmData.intuition) }</Text>
        </CardItem>
        <CardItem>
          <Text>Average: { Math.abs(biorythmData.average) }</Text>
        </CardItem>
      </Card>
    )
  }

}

export default connect(({ settings }) => ({
  userBirthday: convertUserBirthSettingsToMoment(settings.birthDate, settings.birthTime)
  })
)(PersonDetailsScene)

