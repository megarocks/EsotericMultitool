/**
 * Created by vitalii.kyktov on 3/10/17.
 */


import * as types from './actionTypes';

export function startFetching() {
    return {
        type: types.CONTACTS_START_FETCHING
    };
}

export function finishFetching(contacts) {
    return {
        type: types.CONTACTS_FINISH_FETCHING,
        payload: contacts
    };
}