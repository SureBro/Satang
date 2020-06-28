import { isNumber } from 'lodash';
import Currency from './Currency';

/**
 * The main class for Satang
 */

export const ThaiBaht = new Currency({
  symbol: '฿',
  code: 'thb',
  prettyCode: 'THB',
  fullName: 'Thai Baht',
  locale: 'th-TH'
});
export const USD = new Currency({
  symbol: '$',
  code: 'usd',
  prettyCode: 'USD',
  fullName: 'United States Dollar',
  locale: 'en-US'
});

export const Currencies = {
  THB: ThaiBaht,
  USD: USD
};

export {
  Currency,
};

class Satang {
  /**
   * constructor for the Satang class
   * @param  {String} baseCurrency  has to be one of the options available in Currencies. Defaults to THB
   * @param  {Number} money         the amount of money this instance of Satang represents in subunits. Money in satang for Thai baht or in cents for Dollar
   */
  constructor(baseCurrency=ThaiBaht, money=0) {
    if (!(baseCurrency instanceof Currency)) {
      throw new Error(`Unrecognized base currency: baseCurrency should be an instance of Currency class. Check the docs for more info`);
    }

    if (!isNumber(money) || isNaN(money)) {
      throw new Error('Money is not a number');
    }

    if (money === Infinity) {
      throw new Error('Get out');
    }

    if (money < 0) {
      throw new Error('Minimum money value is 0');
    }

    this.baseCurrency = baseCurrency;
    this.money = money;
  }

  /**
   * Returns supported currencies array.
   * @return {Array} An array of objects. Each Object represents a currency
   */
  static supportedCurrencies() {
    return Object.values(Currencies);
  }

  /**
   * Returns a pretty string that represents the information stored in this Satang class
   * @return {String}
   */
  display() {
    const moneyInSubunit = this.money;
    const miuString =  (Math.round(moneyInSubunit) / 100).toLocaleString(this.baseCurrency.locale, { minimumFractionDigits: 2 });

    return `${this.baseCurrency.symbol}${miuString}`;
  }

  /**
   * Merges the supplied satang to this. Can be chained.
   * @param {Satang} satangToAdd The satang to be added to this
   *
   * @return {Satang} return the modified version of this
   */
  add(satangToAdd) {
    if (!(satangToAdd instanceof Satang)) {
      throw new Error('Only a satang can be added to a satang');
    }

    if (this.baseCurrency.code !== satangToAdd.baseCurrency.code) {
      throw new Error('Satangs should be setup with same base currencies if they are to be added');
    }

    this.money = this.money + satangToAdd.money;

    return this;
  }  
}

export default Satang;
