import Satang, { Currencies, ThaiBaht, USD, Currency } from '../src';

test('it throws an error when initialized with unsupported currency', () => {
  expect(() => new Satang('thb', 1000))
  .toThrowError(`Unrecognized base currency: baseCurrency should be an instance of Currency class. Check the docs for more info`);
});

test('it throws an error is money is not a number', () => {
  expect(() => new Satang(Currencies.THB, '100')).toThrowError('Money is not a number');
  expect(() => new Satang(Currencies.THB, -100)).toThrowError('Minimum money value is 0');
  expect(() => new Satang(ThaiBaht, NaN)).toThrowError('Money is not a number');
  expect(() => new Satang(ThaiBaht, Infinity)).toThrowError('Get out');
});

test('it throws an error when initialized with the money under 0', () => {
  expect(() => new Satang(ThaiBaht, -10)).toThrowError('Minimum money value is 0');
});

test('it sets information correctly', () => {
  const productPriceInThb = new Satang(ThaiBaht, 100000);
  const productPriceInUsd = new Satang(USD, 100000);

  expect(productPriceInThb.money).toBe(100000);
  expect(productPriceInUsd.money).toBe(100000);
});

test('it displays satang information properly', () => {
  const productPrice = new Satang(ThaiBaht, 100020);
  const productPriceRepresentation = productPrice.display();
  expect(typeof productPriceRepresentation).toBe('string');
  expect(productPriceRepresentation).toBe('฿1,000.20');
});

test('it throws an error when adding an object that\'s not a Satang', () => {
  const productOnePrice = new Satang(ThaiBaht, 100020);
  const productTwoPrice = new Satang(ThaiBaht, 140020);

  expect(() => productOnePrice.add('productTwoPrice')).toThrowError('Only a satang can be added to a satang');
});

test('it throws an error when adding a Satang with different base currencies', () => {
  const productOnePrice = new Satang(ThaiBaht, 100020);
  const productTwoPrice = new Satang(USD, 140020);

  expect(() => productOnePrice.add(productTwoPrice)).toThrowError('Satangs should be setup with same base currencies if they are to be added');
});

test('it can be manipulated by adding a satang', () => {
  const productOnePrice = new Satang(ThaiBaht, 100020);
  const productTwoPrice = new Satang(ThaiBaht, 140020);
  const cartPrice = new Satang(ThaiBaht, 0);

  cartPrice.add(productOnePrice).add(productTwoPrice);
  expect(cartPrice.money).toBe(240040);
});

test('it returns an array of supported currency info', () => {
  const expectedValue = Object.values(Currencies);

  expect(Satang.supportedCurrencies()).toEqual(expectedValue);
});

test('it accepts custom Currency', () => {
  class EuroCurrency extends Currency {
    constructor(props) {
      super(props);
    }

    display(moneyInSubunits) {
      const formatter = new Intl.NumberFormat(this.locale, { 
        style: 'currency', 
        currency: this.code 
      });

      const money = Math.round(moneyInSubunits / 100);
      return `<strong>${formatter.format(money)}</strong>`;
    }
  }

  const Euro = new EuroCurrency({
    symbol: '€',
    code: 'EUR',
    prettyCode: 'EUR',
    fullName: 'Euro',
    locale: 'de-DE'
  });

  const priceInEur = new Satang(Euro, 9000);
  expect(priceInEur.display()).toBe('<strong>90,00 €</strong>');
});
