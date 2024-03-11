# ContiPay JavaScript Client Documentation

## Requirements

1. ContiPay Account

2. ContiPay Secret and Key

## How it Works

### 1. Install latest version

```bash
npm install contipay-js
```

### 2. Import Classes

```javascript
// Import necessary classes
const Contipay = require("contipay-js/src/contipay");
const SimpleDirectMethod = require("contipay-js/src/helpers/simple_direct_method");
const DirectMethod = require("contipay-js/src/helpers/direct_method");
const SimpleRedirectMethod = require("contipay-js/src/helpers/simple_redirect_method");
const RedirectMethod = require("contipay-js/src/helpers/redirect_method");
```

### 3. Process Payment

#### i. Basic Direct Payment Example

```javascript
const contipay = new Contipay("token-here", "secret-here");

const phone = "263782000340";

const payload = new SimpleDirectMethod(merchantCode, webhookUrl)
  .setUpProvider("InnBucks", "IB")
  .preparePayload(amount, phone);

contipay
  .setAppMode("DEV") // LIVE as another option
  .setPaymentMethod()
  .process(payload)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
```

#### ii. Basic Redirect Payment Example

```javascript
const contipay = new Contipay("token-here", "secret-here");

const phone = "263782000340";

const payload = new SimpleRedirectMethod(
  merchantCode,
  webhookUrl,
  successUrl,
  cancelUrl
).preparePayload(amount, phone);

contipay
  .setAppMode("DEV") // LIVE as another option
  .setPaymentMethod("redirect")
  .process(payload)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
```

#### iii. Direct Payment Example

```javascript
const contipay = new Contipay("token-here", "secret-here");

const phone = "263782000340";

const payload = new DirectMethod(merchantCode, webhookUrl)
  .setUpCustomer("Nigel", "Jaure", phone, "ZW", "nigeljaure@gmail.com")
  .setUpProvider("Ecocash", "EC")
  .setUpAccountDetails(phone, "Nigel Jaure")
  .setUpTransaction(amount, "USD")
  .preparePayload();

contipay
  .setAppMode("DEV")
  .setPaymentMethod()
  .process(payload)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
```

#### iv. Redirect Payment Example

```javascript
const contipay = new Contipay("token-here", "secret-here");

const phone = "263782000340";

const payload = new RedirectMethod(
  merchantCode,
  webhookUrl,
  successUrl,
  cancelUrl
)
  .setUpCustomer("Nigel", "Jaure", phone, "ZW", "nigeljaure@gmail.com")
  .setUpTransaction(amount, "USD")
  .preparePayload();

contipay
  .setAppMode("DEV")
  .setPaymentMethod("redirect")
  .process(payload)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Additional Notes

- The `updateURL` method is optional and applicable only if the URL has changed. Use it to update the URLs accordingly. Here's how you can use it:

```javascript
const contipay = new Contipay("token-here", "secret-here");

// Update URLs if necessary
contipay.updateURL("dev-url", "live-url");

// Process payment with the updated URLs
contipay
  .setAppMode("DEV") // LIVE as another option
  .setPaymentMethod()
  .process(payload)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
```

- Ensure to set the appropriate mode (`DEV` or `LIVE`) using the `setAppMode` method before processing payments.

- The provided examples cover basic scenarios, including direct and redirect payment methods, customer information setup, and transaction details.
