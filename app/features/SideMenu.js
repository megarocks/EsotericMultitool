/**
 * Created by vitalii.kyktov on 3/16/17.
 */

import React, {Component} from 'react';
import { Text,  List, ListItem, Left, Body, Right, Icon } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

export default class SideMenu extends Component {

    changeScene = (sceneName) => () => {
        this.props.closeDrawerFunction();
        Actions[sceneName]();
    }

    render() {
        return (
            <Grid>
                <Row size={20} style={logoRowStyles}><Text>Logo Will Be Here</Text></Row>
                <Row size={80}>
                    <List style={ menuListStyles }>
                        <ListItem icon onPress={ this.changeScene('todayScene') }>
                            <Left><Icon name="clock" /></Left>
                            <Body><Text>Today</Text></Body>
                            <Right><Icon name="arrow-forward" /></Right>
                        </ListItem>
                        <ListItem icon onPress={ this.changeScene('contactsList') }>
                            <Left><Icon name="person" /></Left>
                            <Body><Text>Contacts</Text></Body>
                            <Right><Icon name="arrow-forward" /></Right>
                        </ListItem>
                        <ListItem icon onPress={ this.changeScene('dateReduce') }>
                            <Left><Icon name="calendar"/></Left>
                            <Body><Text>Date Reduce</Text></Body>
                            <Right><Icon name="arrow-forward" /></Right>
                        </ListItem>
                        <ListItem icon>
                            <Left><Icon name="cog" /></Left>
                            <Body><Text>Settings</Text></Body>
                            <Right><Icon name="arrow-forward" /></Right>
                        </ListItem>
                    </List>
                </Row>
            </Grid>
        );
    }
}

const menuListStyles = {
    flexGrow: 1
};

const logoRowStyles = {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fc5830',
};