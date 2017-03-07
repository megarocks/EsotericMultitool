/**
 * Created by alt on 3/7/17.
 * @flow
 */
import moment from 'moment';

export const convertBirthdayObjectToDate = (birthdayObj: Object): moment => {
  const {year, month, day} = birthdayObj;
  return moment({year, month: month - 1, day});
};

export const getNextBirthday = (birthday: Object): moment => {
  return birthday >= moment()
    ? birthday
    : moment(birthday).add(1, 'y');
};