// @flow

export default (date: Date): number => {
    const dateString =
     String(date.getDate()) +
     String(date.getMonth() + 1) +
     String(date.getFullYear());

    return reduceStringNumber(dateString);
  }

  function reduceStringNumber (strNumber: string): number {
    const numbersArray = strNumber.split('');
    const reducedNumber = numbersArray.reduce((a, b) => {
        return Number(a) + Number(b);
    }, 0);
    if (reducedNumber > 10) {
        return reduceStringNumber(String(reducedNumber));
    }
    return reducedNumber;
  }
