/**
 * Created by alt on 3/7/17.
 * @flow
 */
import moment from 'moment';

export const convertBirthdayObjectToDate = (birthdayObj: Object): moment => {
  const {year, month, day} = birthdayObj;
  return moment({year, month: month - 1, day});
};

export const getNextBirthday = (birthday: moment): moment => {
  const now = moment();
  const thisYearBirthday = moment(birthday).set('year', now.get('year'));
  return thisYearBirthday >= now
    ? thisYearBirthday
    : thisYearBirthday.add(1, 'y');
};