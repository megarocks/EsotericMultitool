/*
 @flow

 */

import React, {Component, PropTypes} from 'react';
import { Container, Header, Body, Title, Content, Text, Grid, Row } from 'native-base';

import {
  StyleSheet,
  DatePickerIOS
} from 'react-native';

import reduceDate from '../utils/reduceDate';

export default class DateReduceScene extends Component {
  static defaultProps = {
    date: new Date(),
  };

  state = {
    date: this.props.date,
    reducedDate: reduceDate(this.props.date)
  };

  onDateChange = (date: Date) => {
    this.setState({
      date,
      reducedDate: reduceDate(date)
    });
  };

  render() {
    return (
      <Container>
          <Header>
              <Body>
              <Title>Date Reduce</Title>
              </Body>
          </Header>
          <Content>
              <Text style={{fontSize: 128, alignSelf: 'center'}}>{this.state.reducedDate}</Text>
              <DatePickerIOS
                date={this.state.date}
                mode="date"
                onDateChange={this.onDateChange}
              />
          </Content>
      </Container>
    );
  }
}

const numberStyles = {
  fontSize: 128
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  inputs: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50
  },
  outputs: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 128,
  }
});



