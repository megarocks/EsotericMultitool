import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  DatePickerIOS
} from 'react-native';


import reduceDate from './utils/reduceDate';

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
      <View style={styles.container}>
       <View style={styles.outputs}>
        <Text style={styles.number}>{this.state.reducedDate}</Text>
       </View>
       <View style={styles.inputs}>
         <DatePickerIOS
           date={this.state.date}
           mode="date"
           onDateChange={this.onDateChange}
           />
        </View>
      </View>
    );
  }

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

DateReduceScene.propTypes = {
  title: PropTypes.string.isRequired,
  onForward: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
