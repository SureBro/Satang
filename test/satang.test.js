import { values } from 'lodash';
import Satang, { Currencies, CurrencyData } from '../src';

test('it throws an error when initialized with unsupported currency', () => {
  const baseCurrency = 'thb';
  expect(() => new Satang('thb', 1000))
  .toThrowError(`Unrecognized currency: ${baseCurrency}. Only ${values(Currencies).join(',')} are supported`);
});

test('it throws an error is money is not a number', () => {
  expect(() => new Satang(Currencies.THB, '100')).toThrowError('Money is not a number');
  expect(() => new Satang(Currencies.THB, NaN)).toThrowError('Money is not a number');
  expect(() => new Satang(Currencies.THB, Infinity)).toThrowError('Get out');
});

test('it throws an error when initialized with the money under 0', () => {
  expect(() => new Satang(Currencies.THB, -10)).toThrowError('Minimum money value is 0');
});

test('it sets information correctly', () => {
  const productPriceInThb = new Satang(Currencies.THB, 100000);
  const productPriceInUsd = new Satang(Currencies.USD, 100000);

  expect(productPriceInThb.money).toBe(100000);
  expect(productPriceInThb.baseCurrency).toBe(CurrencyData[Currencies.THB]);

  expect(productPriceInUsd.money).toBe(100000);
  expect(productPriceInUsd.baseCurrency).toBe(CurrencyData[Currencies.USD]);
});

test('it displays satang information properly', () => {
  const productPrice = new Satang(Currencies.THB, 100020);
  const productPriceRepresentation = productPrice.display();
  expect(typeof productPriceRepresentation).toBe('string');
  expect(productPriceRepresentation).toBe('฿1,000.20');
});

test('it throws an error when adding an object that\'s not a Satang', () => {
  const productOnePrice = new Satang(Currencies.THB, 100020);
  const productTwoPrice = new Satang(Currencies.THB, 140020);

  expect(() => productOnePrice.add('productTwoPrice')).toThrowError('Only a satang can be added to a satang');
});

test('it throws an error when adding a Satang with different base currencies', () => {
  const productOnePrice = new Satang(Currencies.THB, 100020);
  const productTwoPrice = new Satang(Currencies.USD, 140020);

  expect(() => productOnePrice.add(productTwoPrice)).toThrowError('Satangs should be setup with same base currencies if they are to be added');
});

test('it can be manipulated by adding a satang', () => {
  const productOnePrice = new Satang(Currencies.THB, 100020);
  const productTwoPrice = new Satang(Currencies.THB, 140020);
  const cartPrice = new Satang(Currencies.THB, 0);

  cartPrice.add(productOnePrice).add(productTwoPrice);
  expect(cartPrice.money).toBe(240040);
});
