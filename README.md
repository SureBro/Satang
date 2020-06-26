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
import Satang, { Currencies } from 'path/to/Satang';

// First param is the amount of money in subunits. To map $100, amount should be 10000.
// Only Currencies.THB and Currencies.USD are supported
const price = new Satang(Currencies.THB, 10000);
```

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
