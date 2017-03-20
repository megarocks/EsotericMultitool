/*


 */

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Container, Header, Body, Title, Content, Text, List, ListItem, Card, CardItem} from 'native-base';
import moment from 'moment';
import suncalc from 'suncalc';

import * as todayActions from '../actions/todayActions';


class TodayScene extends Component {

    state = {
        now: moment()
    };
    _ticker = 0;

    tick = () => {
        const {position: {coords: {latitude = null, longitude = null}}} = this.props;
        const now = moment();

        if (!latitude || !longitude) {
            return this.setState({
                now
            })
        }

        const todaySunTimes = suncalc.getTimes(now, latitude, longitude);
        const tomorrowSunTimes = suncalc.getTimes(moment().add(1, 'd'), latitude, longitude);

        this.setState({
            now,
            sunTimes: {
                todaySunTimes,
                tomorrowSunTimes
            }
        })
    };

    componentDidMount() {

        const {actions} = this.props;

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
        const {position: {coords: {latitude = 0, longitude = 0}}} = this.props;
        const {now} = this.state;
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Today</Title>
                    </Body>
                </Header>
                <Content>
                    <Text>{ now.toString() }</Text>
                    <Text>Latitude: { latitude.toFixed(4) }, Longitude: { longitude.toFixed(4) }</Text>
                    {this._renderSunRiseCard()}
                    {this._renderSunSetCard()}
                </Content>
            </Container>
        );
    }

    _renderSunTimes = () => {
        const { sunTimes: { todaySunTimes, tomorrowSunTimes } = {}, now} = this.state;

        if (!todaySunTimes || !tomorrowSunTimes) return null;

        const todaySRStart = moment(todaySunTimes.sunrise);
        const todaySREnd= moment(todaySunTimes.sunriseEnd);
        const tmrSRStart = moment(tomorrowSunTimes.sunrise);
        const tmrSREnd= moment(tomorrowSunTimes.sunriseEnd);
        const nextSunrize = now <= todaySRStart
            ? { start: todaySRStart, end: todaySREnd }
            : { start: tmrSRStart, end: tmrSREnd };
        const sunRise = (
            <Card>
                <CardItem itemHeader first><Text>Sunrise</Text></CardItem>
                <CardItem>
                    <Text>Today ({todaySRStart.format('DD MMM')}): {todaySRStart.format('LTS')} - {todaySREnd.format('LTS')}</Text>
                </CardItem>
                <CardItem>
                    <Text>Next ({nextSunrize.start.format('DD MMM HH:mm')}): {nextSunrize.start.toNow()}</Text>
                </CardItem>
            </Card>
        );

        const todaySunSetStart = moment(todaySunTimes.sunsetStart);
        const todaySunSetEnd = moment(todaySunTimes.sunset);
        const tmrSunSetStart = moment(tomorrowSunTimes.sunsetStart);
        const tmrSunSetEnd = moment(tomorrowSunTimes.sunset);
        const nextSunset = now <= todaySunSetStart
            ? { start: todaySunSetStart, end: todaySunSetEnd }
            : { start: tmrSunSetStart, end: tmrSunSetEnd };
        const sunSet = (
            <Card>
                <CardItem itemHeader first><Text>Sunset</Text></CardItem>
                <CardItem>
                    <Text>Today ({todaySunSetStart.format('DD MMM')}): {todaySunSetStart.format('LTS')} - {todaySunSetEnd.format('LTS')}</Text>
                </CardItem>
                <CardItem>
                    <Text>Next ({nextSunset.start.format('DD MMM HH:mm')}): {nextSunset.start.toNow()}</Text>
                </CardItem>
            </Card>
        );

        return (
            <Card>
                <CardItem itemHeader first><Text>Sunrise</Text></CardItem>
                <CardItem>
                    <Text>Today ({todaySRStart.format('DD MMM')}): {todaySRStart.format('LTS')} - {todaySREnd.format('LTS')}</Text>
                </CardItem>
                <CardItem>
                    <Text>Next ({nextSunrize.start.format('DD MMM HH:mm')}): {nextSunrize.start.toNow()}</Text>
                </CardItem>
            </Card>
        )


        const sunTimesTitles = Object.keys(sunTimes);

        const sunTimesListItems = sunTimesTitles.map(suntime => {
            return <ListItem key={suntime}><Text>{suntime}: {sunTimes[suntime].toString()}</Text></ListItem>
        });

        return <List>{sunTimesListItems}</List>;
    }

    _renderSunRiseCard = () => {
        const { sunTimes: { todaySunTimes, tomorrowSunTimes } = {}, now} = this.state;

        if (!todaySunTimes || !tomorrowSunTimes) return null;

        const todaySRStart = moment(todaySunTimes.sunrise);
        const todaySREnd= moment(todaySunTimes.sunriseEnd);
        const tmrSRStart = moment(tomorrowSunTimes.sunrise);
        const tmrSREnd= moment(tomorrowSunTimes.sunriseEnd);
        const nextSunrize = now <= todaySRStart
            ? { start: todaySRStart, end: todaySREnd }
            : { start: tmrSRStart, end: tmrSREnd };
        const sunRise = (
            <Card>
                <CardItem itemHeader first><Text>Sunrise 🌅</Text></CardItem>
                <CardItem>
                    <Text>Today: {todaySRStart.format('DD MMM')} {todaySRStart.format('HH:mm:ss')} - {todaySREnd.format('HH:mm:ss')}</Text>
                </CardItem>
                <CardItem>
                    <Text>Next: {nextSunrize.start.format('DD MMM HH:mm:ss')}, {nextSunrize.start.fromNow()}</Text>
                </CardItem>
            </Card>
        );

        return sunRise;
    }

    _renderSunSetCard = () => {
        const { sunTimes: { todaySunTimes, tomorrowSunTimes } = {}, now} = this.state;
        if (!todaySunTimes || !tomorrowSunTimes) return null;

        const todaySunSetStart = moment(todaySunTimes.sunsetStart);
        const todaySunSetEnd = moment(todaySunTimes.sunset);
        const tmrSunSetStart = moment(tomorrowSunTimes.sunsetStart);
        const tmrSunSetEnd = moment(tomorrowSunTimes.sunset);
        const nextSunset = now <= todaySunSetStart
            ? { start: todaySunSetStart, end: todaySunSetEnd }
            : { start: tmrSunSetStart, end: tmrSunSetEnd };
        const sunSet = (
            <Card>
                <CardItem itemHeader first><Text>Sunset 🌇</Text></CardItem>
                <CardItem>
                    <Text>Today: {todaySunSetStart.format('DD MMM')} {todaySunSetStart.format('HH:mm:ss')} - {todaySunSetEnd.format('HH:mm:ss')}</Text>
                </CardItem>
                <CardItem>
                    <Text>Next: {nextSunset.start.format('DD MMM HH:mm:ss')}, {nextSunset.start.fromNow()}</Text>
                </CardItem>
            </Card>
        );
        return sunSet;
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


