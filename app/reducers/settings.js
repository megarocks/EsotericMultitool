/**
 * Created by vitalii.kyktov on 3/18/17.
 */

import * as types from '../actions/actionTypes';

const initialState = {
  birthDate: null,
  birthTime: null,
  birthLocation: null
};

export default function contacts(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_BIRTHDAY_DATE:
      return {
        ...state,
        birthDate: action.payload
      };
    case types.SET_BIRTHDAY_TIME:
      return {
        ...state,
        birthTime: action.payload,
      };
    case types.SET_BIRTHDAY_LOCATION:
      return {
        ...state,
        birthLocation: action.payload,
      };
    default:
      return state;
  }
}