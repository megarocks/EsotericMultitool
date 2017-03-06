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
  Right
} from 'native-base';

export default class PersonDetailsScene extends Component {
  constructor(props: Object) {
    super(props);
  }

  state = {};

  static defaultProps = {};
  static propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  componentDidMount() {}

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.props.onBack}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Person Details</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <Text>Person Details Will Be Here</Text>
        </Content>
      </Container>
    );
  }

}

