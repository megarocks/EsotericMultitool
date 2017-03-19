/*


 */

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Header, Body, Title, Content, Text, List, ListItem} from 'native-base';
import moment from 'moment';
import suncalc from 'suncalc';

import * as todayActions from '../actions/todayActions';


class TodayScene extends Component {

  state = {
    now: moment()
  };
  _ticker = 0;

  tick = () => {
    const { position: { coords: { latitude = null, longitude = null } } } = this.props;
    const now = moment();

    if (!latitude || !longitude) {
      return this.setState({
        now
      })
    }

    const sunTimes = suncalc.getTimes(now, latitude, longitude);

    this.setState({
      now,
      sunTimes
    })
  };

  componentDidMount() {

    const { actions } = this.props;

    this._ticker = setInterval(this.tick, 1000);
    actions.startPositionFetching();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        actions.finishPositionFetching(position);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  componentWillUnmount = () => {
    clearInterval(this._ticker);
  }

  render() {
    const { position: { coords: { latitude = null, longitude = null } } } = this.props;
    const { now } = this.state;
    return (
      <Container>
        <Header>
          <Body>
          <Title>Today</Title>
          </Body>
        </Header>
        <Content>
          <Text>{ now.toString() }</Text>
          <Text>Latitude: { latitude }, Longitude: { longitude }</Text>
          {this._renderSunTimes()}
        </Content>
      </Container>
    );
  }

  _renderSunTimes = () => {
    const { sunTimes } = this.state;
    if (!sunTimes) return null;

    const sunTimesTitles = Object.keys(sunTimes);

    const sunTimesListItems = sunTimesTitles.map(suntime => {
      return <ListItem key={suntime}><Text>{suntime}: {sunTimes[suntime].toString()}</Text></ListItem>
    });

    return <List>{sunTimesListItems}</List>;
  }
}

export default connect(state => ({
    position: state.today.position,
    inProgress: state.today.fetching
  }),
  (dispatch) => ({
    actions: bindActionCreators(todayActions, dispatch)
  })
)(TodayScene)


