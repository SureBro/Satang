import { indexOf, values, isNumber } from 'lodash';

/**
 * The main class for Satang
 */

export const Currencies = {
  THB: 'THB',
  USD: 'USD'
};

const CurrencyData = {};

CurrencyData[Currencies.THB] = {
  symbol: '฿',
  code: 'thb',
  prettyCode: 'THB',
  fullName: 'Thai Baht',
  locale: 'th-TH'
};

CurrencyData[Currencies.USD] = {
  symbol: '$',
  code: 'usd',
  prettyCode: 'USD',
  fullName: 'United States Dollar',
  locale: 'en-US'
};

export {
  CurrencyData
};

class Satang {
  /**
   * constructor for the Satang class
   * @param  {String} baseCurrency  has to be one of the options available in Currencies. Defaults to THB
   * @param  {Number} money         the amount of money this instance of Satang represents in subunits. Money in satang for Thai baht or in cents for Dollar
   */
  constructor(baseCurrency=Currencies.THB, money=0) {
    const supportedCurrencies = values(Currencies);
    if (indexOf(supportedCurrencies, baseCurrency) < 0) {
      throw new Error(`Unrecognized currency: ${baseCurrency}. Only ${supportedCurrencies.join(',')} are supported`);
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

    this.baseCurrency = CurrencyData[baseCurrency];
    this.money = money;
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

  /**
   * Returns supported currencies array.
   * @return {Array} An array of objects. Each Object represents a currency
   */
  supportedCurrencies() {
    return values(CurrencyData);
  }
}

export default Satang;
