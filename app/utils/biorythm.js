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
  return Math.sin(2 * Math.PI * diff / quotientValue) * 100;
}

export default function(birthday, calculationDate) {

  const dateDifference = calculationDate - birthday;

  const physical = Math.round(calcBioValue(rhythms.physical, dateDifference));
  const emotion = Math.round(calcBioValue(rhythms.emotion, dateDifference));
  const intellect = Math.round(calcBioValue(rhythms.intellect, dateDifference));
  const intuition = Math.round(calcBioValue(rhythms.intuition, dateDifference));

  return { physical, emotion, intellect, intuition,
    average: (physical + emotion + intellect + intuition) / 4
  };
}

