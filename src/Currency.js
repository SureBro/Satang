export default class Currency {
  constructor({
    symbol,
    code,
    prettyCode,
    fullName,
    locale,
  }) {
    this.symbol = symbol;
    this.code = code;
    this.prettyCode = prettyCode;
    this.fullName = fullName;
    this.locale = locale;
  }

  display(moneyInSubunit) {
    // const miuString =  (Math.round(moneyInSubunit) / 100).toLocaleString(this.baseCurrency.locale, { minimumFractionDigits: 2 });
    return new Intl.NumberFormat(this.locale, { style: 'currency', currency: this.code }).format((Math.round(moneyInSubunit) / 100));
    // return `${this.baseCurrency.symbol}${miuString}`;
  }
}