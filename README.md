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
const price = new Satang(10000, Currencies.THB); 
```

### Display

You can get a pretty string that represents your money by using the `display()` method

```javascript
const price = new Satang(10000, Currencies.THB);
price.display(); // output => ฿100.00
```

### Satang Manipulation

You can manipulate satang value. To add 2 satangs, you can use the `add()` method

```javascript
 const cartPrice = new Satang(0, Currencies.THB);
 const product1Price = new Satang(10000, Currencies.THB);
 const product2Price = new Satang(15000, Currencies.THB);
 
 cartPrice.add(product1Price);
 cartPrice.display(); // output => ฿100.00
```

You can also chain manipulations

```javascript
cartPrice.add(product1Price).add(product2Price).display(); // output => ฿250.00
```
