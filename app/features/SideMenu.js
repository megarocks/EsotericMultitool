/**
 * Created by vitalii.kyktov on 3/16/17.
 */

import React, {Component} from 'react';
import { Text,  List, ListItem, Left, Body, Right, Icon } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';

export default class SideMenu extends Component {
    render() {
        return (
            <Grid>
                <Row size={20} style={logoRowStyles}><Text>Logo Will Be Here</Text></Row>
                <Row size={80}>
                    <List style={ menuListStyles }>
                        <ListItem icon>
                            <Left><Icon name="person" /></Left>
                            <Body><Text>Contacts</Text></Body>
                            <Right><Icon name="arrow-forward" /></Right>
                        </ListItem>
                        <ListItem icon>
                            <Left><Icon name="plane" /></Left>
                            <Body><Text>Date Info</Text></Body>
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