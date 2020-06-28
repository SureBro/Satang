# Satang
Node Module to manage money information.

-------
### This is not ready to be used in production
-------

### Install

Install via npm
```
npm install satang --save
```

Install via yarn
```
yarn add satang
```

### Initializing

```javascript
import Satang, { Currencies } from 'satang';

// First param is the amount of money in subunits. To map $100, amount should be 10000.
// Only Currencies.THB and Currencies.USD are supported
const price = new Satang(Currencies.THB, 10000);
```

You could also directly import Thai baht currency directly,

```javascript
import Satang, { ThaiBaht } from 'satang';

// First param is the amount of money in subunits. To map $100, amount should be 10000.
// Only Currencies.THB and Currencies.USD are supported
const price = new Satang(ThaiBaht, 10000);
```

Supported currencies are **ThaiBaht** & **USD**

### Pretty String

You can get a pretty string that represents your money by using the `display()` method

```javascript
const price = new Satang(Currencies.THB, 10000);
price.display(); // output => ฿100.00
```

### Satang Manipulation

You can manipulate satang value. To add 2 satangs, you can use the `add()` method

```javascript
 const cartPrice = new Satang(Currencies.THB, 0);
 const product1Price = new Satang(Currencies.THB, 10000);
 const product2Price = new Satang(Currencies.THB, 15000);

 cartPrice.add(product1Price);
 cartPrice.display(); // output => ฿100.00
```

You can also chain manipulations

```javascript
cartPrice.add(product1Price).add(product2Price).display(); // output => ฿250.00
```

### Supported Currencies

At the moment, Satang only supports USD & THB. Frankly, it's not the best implementation for currency support and it will be changed in the future. You can get access to supported currency using two methods

- Just import it using `import { Currencies } from 'satang'`

- Second, you can access supported currency data from  using the `supportedCurrencies()` method.
```javascript
Satang.supportedCurrencies();
```

### Custom Currencies

If you'd like to use a custom currency, you'll need to create an instance of `Currency`. Here's an example:

```javascript
import Satang, { Currency } from 'satang';

const Euro = new Currency({
  // Symbol used when display-ing value for this currency,
  symbol: '€',
  // Short code, should be unique
  code: 'eur',
  // Will be used when dispay-ing value for this currency
  prettyCode: 'EUR',
  // Name of the currency
  fullName: 'Euro',
  // Locale used to format string displaying the value of the currency
  locale: 'de-AT'
});

const price = new Satang(Euro, 9000);

console.log(price.display()); // Logs €90.00

If you would like to more control over the display function, you can inherit Currency to create your own Currency instead

Eg: 
```javascript
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

priceInEur.display(); // Return <strong>90,00 €</strong>
```

### Note

If your currency display doesn't match your expected format and you are running in node environment, you might be missing **ICU** data file.

Install the icu file with `npm install full-icu`

then point to the icu dataset by `NODE_ICU_DATA=node_modules/full-icu node app.js`

Just keep in mind that this means binary size is going to increase. [https://github.com/unicode-org/full-icu-npm](Read more here)
