const Reference = require("../utils/reference");

class RedirectMethod {
  /**
   * Constructor for initializing class properties.
   *
   * @param {number} merchantCode  The merchant code.
   * @param {string} webhookUrl    The URL for webhook notifications.
   * @param {string} successUrl    The URL to redirect to upon successful transaction.
   * @param {string} cancelUrl     The URL to redirect to upon canceled transaction.
   */
  constructor(merchantCode, webhookUrl, successUrl, cancelUrl) {
    this.merchantCode = merchantCode;
    this.webhookUrl = webhookUrl;
    this.successUrl = successUrl;
    this.cancelUrl = cancelUrl;
  }

  /**
   * Set up customer details.
   *
   * @param {string} firstName    The first name of the customer.
   * @param {string} lastName     The last name of the customer.
   * @param {string} cell         The cell number of the customer.
   * @param {string} [countryCode='ZW']  The country code of the customer.
   * @param {string} [email=""]   The email address of the customer (optional).
   * @param {string} [middleName="-"]  The middle name of the customer.
   * @param {string} [nationalId="-"]  The national ID of the customer.
   *
   * @return {RedirectMethod} Returns the instance for method chaining.
   */
  setUpCustomer(
    firstName,
    lastName,
    cell,
    countryCode = "ZW",
    email = "",
    middleName = "-",
    nationalId = "-"
  ) {
    this.email = email === "" ? `${cell}@contipay.co.zw` : email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.nationalId = nationalId;
    this.countryCode = countryCode;
    this.cell = cell;

    return this;
  }

  /**
   * Set up transaction details.
   *
   * @param {number} amount                The amount of the transaction.
   * @param {string} [currency='ZWL']     The currency code.
   * @param {string} [transactionRef='']  The reference for the transaction.
   * @param {string} [transactionDescription=''] The description for the transaction.
   *
   * @return {RedirectMethod} Returns the instance for method chaining.
   */
  setUpTransaction(
    amount,
    currency = "ZWL",
    transactionRef = "",
    transactionDescription = ""
  ) {
    const ref =
      transactionRef === ""
        ? `V-${new Reference().generate(8)}`
        : transactionRef;
    const description =
      transactionDescription === ""
        ? `Payment with ref: ${ref}`
        : transactionDescription;

    this.amount = amount;
    this.currency = currency;
    this.ref = ref;
    this.description = description;

    return this;
  }

  /**
   * Prepare payment payload for a transaction.
   *
   * @param {boolean} [isCoc=false]  Indicates if the transaction is Cash on Collection.
   * @param {boolean} [isCod=false]  Indicates if the transaction is Cash on Delivery.
   *
   * @return {object} The prepared payment payload.
   */
  preparePayload(isCoc = false, isCod = false) {
    return {
      reference: this.ref,
      cod: isCod,
      coc: isCoc,
      description: this.description,
      amount: this.amount,
      customer: {
        firstName: this.firstName,
        surname: this.lastName,
        middleName: this.middleName,
        nationalId: this.nationalId,
        email: this.email,
        cell: this.cell,
        countryCode: this.countryCode,
      },
      currencyCode: this.currency,
      merchantId: this.merchantCode,
      webhookUrl: this.webhookUrl,
      successUrl: this.successUrl,
      cancelUrl: this.cancelUrl,
    };
  }
}

module.exports = RedirectMethod;
