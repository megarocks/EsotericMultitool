/**
 * @flow
 * Created by alt on 3/5/17.
 */

import React, { Component, PropTypes } from 'react';
import {
  Text,
} from 'react-native';

import reduceDate from '../../utils/reduceDate';

export default class DateReduce extends Component {
  static defaultProps = {
    date: new Date(),
  };

  state = {
    reducedDate: reduceDate(this.props.date)
  };

  render = () => <Text>{reduceDate(this.props.date)}</Text>

}