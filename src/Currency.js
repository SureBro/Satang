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
}