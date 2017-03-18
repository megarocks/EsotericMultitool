/*
 @flow

 */

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Header, Body, Title, Content, Text, Grid, Row, Card} from 'native-base';
import moment from 'moment';

import * as todayActions from '../actions/todayActions';


class TodayScene extends Component {

  componentDidMount() {

    const { actions } = this.props;

    actions.setDate(moment());
    actions.startPositionFetching();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        actions.finishPositionFetching(position);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render() {
    const { position: { coords: { latitude = null, longitude = null } }, date = moment() } = this.props;
    return (
      <Container>
        <Header>
          <Body>
          <Title>Today</Title>
          </Body>
        </Header>
        <Content>
          <Text>{ date.toString() }</Text>
          <Text>Latitude: { latitude }, Longitude: { longitude }</Text>
        </Content>
      </Container>
    );
  }
}

export default connect(state => ({
    position: state.today.position,
    date: state.today.date,
    inProgress: state.today.fetching
  }),
  (dispatch) => ({
    actions: bindActionCreators(todayActions, dispatch)
  })
)(TodayScene)


