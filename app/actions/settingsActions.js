/**
 * Created by alt on 3/18/17.
 */

import * as types from './actionTypes';

export function setBirthdayDate(date) {
  return {
    type: types.SET_BIRTHDAY_DATE,
    payload: date
  };
}

export function setBirthdayTime(time) {
  return {
    type: types.SET_BIRTHDAY_TIME,
    payload: time
  };
}

export function setBirthdayLocation(location) {
  return {
    type: types.SET_BIRTHDAY_LOCATION,
    payload: location
  }
}