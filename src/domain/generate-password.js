import _ from 'lodash';
import dwGen from 'diceware-generator';
import enEFF from 'diceware-wordlist-en-eff';

export default function generatePassword() {
  return _.join(
    dwGen({
      language: enEFF,
      wordcount: 5,
      format: 'array'
    }),
    '-'
  );
}
