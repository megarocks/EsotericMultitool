/**
 * Created by vitalii.kyktov on 3/10/17.
 */

import * as types from '../actions/actionTypes';

const initialState = {
  position: {coords: {}},
  fetching: false
};

export default function contacts(state = initialState, action = {}) {
  switch (action.type) {
    case types.POSITION_START_FETCHING:
      return {
        ...state,
        fetching: true
      };
    case types.POSITION_FINISH_FETCHING:
      return {
        ...state,
        position: action.payload,
        fetching: false
      };
    case types.SET_CURRENT_DATE:
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
}