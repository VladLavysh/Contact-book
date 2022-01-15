// Тесты вспомогательных функций
/* eslint-disable */

const utils = require('../src/utils');
const methods = utils.validation.methods;

describe('Capitalized word', () => {
  test('Should return word with capitalized first char', () => {
    expect(methods.capitalizeWord('word')).toBe('Word');
  });

  test('Should not be undefined', () => {
    expect(methods.capitalizeWord('word')).not.toBeUndefined();
  });
})

describe('Full name abbr', () => {
  test('Should return abbr of full name', () => {
    expect(methods.contactAbbr('Vlad', 'Lavysh')).toBe('VL');
  });

  test('Should not be undefined', () => {
    expect(methods.contactAbbr('Vlad', 'Lavysh')).not.toBeUndefined();
  });
})

describe('Phone number', () => {
  test('Should return valid phone number', () => {
    expect(methods.validPhoneNumber('48518254052')).toBe('+48 518 254 052');
  });

  test('Should not be undefined', () => {
    expect(methods.validPhoneNumber('48518254052')).not.toBeUndefined();
  });
})