/**
 * Created by alt on 3/8/17.
 * @flow
 */
import moment from 'moment';

export const getZodiacData = (b: moment): Object => {
  const birthday = moment(b);
  const sign = _getZodiacSign(birthday);
  const element = _getZodiacElement(sign);
  const symbol = _getSymbol(sign);

  return { sign, element, symbol };
}

const _getZodiacSign = (birthday: moment): string => {
  console.log(birthday);
  const month = birthday.month() + 1;
  console.log(month);
  const day = birthday.date();
  console.log(day);

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  else throw new Error('Can`t identify zodiac sign by given dates:', day, month);
};

const _getZodiacElement = (sign: string): string => {

  if (sign === 'Aries' || sign === 'Leo' || sign === 'Sagittarius') return 'fire';
  else if (sign === 'Taurus' || sign === 'Virgo' || sign === 'Capricorn') return 'earth';
  else if (sign === 'Gemini' || sign === 'Libra' || sign === 'Aquarius') return 'air';
  else if (sign === 'Cancer' || sign === 'Scorpio' || sign === 'Pisces') return 'water';
  else throw new Error('Can`t identify zodiac element by given sign:', sign);

};

const _getSymbol = (sign: string): string => {

  const symbols = {
    'Aries': '♈',
    'Taurus': '♉',
    'Gemini': '♊',
    'Cancer': '♋',
    'Leo': '♌',
    'Virgo': '♍',
    'Libra': '♎',
    'Scorpio': '♏',
    'Sagittarius': '♐',
    'Capricorn': '♑',
    'Aquarius': '♒',
    'Pisces': '♓',
  };

  return symbols[sign];

};