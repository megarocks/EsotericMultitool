/**
 * Created by alt on 3/5/17.
 */
import moment from 'moment';

const rhythms = {
  physical: daysToMSeconds(23),
  emotion: daysToMSeconds(28),
  intellect: daysToMSeconds(33),
  intuition: daysToMSeconds(37)
};
function daysToMSeconds(days) {
  return days * 24 * 60 * 60 * 1000;
}
function calcBioValue(quotientValue, diff) {
  return Math.sin((diff / quotientValue) * 2 * Math.PI) * 100;
}

export default function(birthday, calculationDate) {

  const dateDifference = calculationDate - birthday;

  const biorythmForDay = {
    physical: Math.round(calcBioValue(rhythms.physical, dateDifference)) ,
    emotion: Math.round(calcBioValue(rhythms.emotion, dateDifference)),
    intellect: Math.round(calcBioValue(rhythms.intellect, dateDifference)),
    intuition: Math.round(calcBioValue(rhythms.intuition, dateDifference)),
  };

  return biorythmForDay;
}

