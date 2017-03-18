/**
 * Created by alt on 3/18/17.
 */

import * as types from './actionTypes';

export function startPositionFetching() {
  return {
    type: types.POSITION_START_FETCHING
  };
}

export function finishPositionFetching(position) {
  return {
    type: types.POSITION_FINISH_FETCHING,
    payload: position
  };
}

export function setDate(date) {
  return {
    type: types.SET_CURRENT_DATE,
    payload: date
  }
}