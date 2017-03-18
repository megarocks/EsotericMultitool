/**
 * Created by alt on 3/18/17.
 */

/*
 @flow

 */

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Header, Body, Title, Content, Form, Item, Label} from 'native-base';

import DatePicker from 'react-native-datepicker'

import * as settingsActions from '../actions/settingsActions';

class SettingsScene extends Component {

  render() {
    const {actions, birthDate, birthTime} = this.props;
    return (
      <Container>
        <Header>
          <Body>
          <Title>Today</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Birth Date</Label>
              <DatePicker
                mode="date"
                date={birthDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={ (date) => {actions.setBirthdayDate(date)} }
                style={pickerStyles}
              />
            </Item>
            <Item fixedLabel last>
              <Label>Birth Time</Label>
              <DatePicker
                mode="time"
                format="HH:mm"
                date={birthTime}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={ (time) => {actions.setBirthdayTime(time)} }
                style={ pickerStyles }
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const pickerStyles = {
  width: null,
  flex: 3,
  borderWidth: 0,
  borderColor: 'white',
  borderStyle: null
};

export default connect(state => ({
    birthDate: state.settings.birthDate,
    birthTime: state.settings.birthTime
  }),
  (dispatch) => ({
    actions: bindActionCreators(settingsActions, dispatch)
  })
)(SettingsScene)


