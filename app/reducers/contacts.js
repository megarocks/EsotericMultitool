/**
 * Created by vitalii.kyktov on 3/10/17.
 */

import * as types from '../actions/actionTypes';

const initialState = {
    contacts: [],
    fetching: false
};

export default function contacts(state = initialState, action = {}) {
    switch (action.type) {
        case types.CONTACTS_START_FETCHING:
            return {
                ...state,
                contacts: [],
                fetching: true
            };
        case types.CONTACTS_FINISH_FETCHING:
            return {
                ...state,
                contacts: action.payload,
                fetching: false
            };
        default:
            return state;
    }
}