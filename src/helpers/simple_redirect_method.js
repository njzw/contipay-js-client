const Reference = require("../utils/reference");

class SimpleRedirectMethod {
  constructor(merchantId, webhookUrl, successUrl, cancelUrl) {
    // Initialize class properties
    this.successUrl = successUrl;
    this.cancelUrl = cancelUrl;
    this.webhookUrl = webhookUrl;
    this.merchantId = merchantId;
  }

  /**
   * Prepare payment payload for a transaction.
   *
   * @param {number} amount - The amount of the transaction.
   * @param {string} account - The account name or identifier.
   * @param {string} currency - The currency code (default: 'USD').
   * @param {string|null} ref - The reference for the transaction (optional).
   * @param {string} description - The description for the transaction (optional).
   * @param {string} cell - The cell number (optional).
   * @param {boolean} isCod - Indicates if the transaction is Cash on Delivery (optional).
   * @param {boolean} isCoc - Indicates if the transaction is Cash on Collection (optional).
   * @returns {Object} - The prepared payment payload.
   */
  preparePayload(
    amount,
    account,
    currency = "USD",
    ref = null,
    description = "",
    cell = "",
    isCod = false,
    isCoc = false
  ) {
    // Use account as cell if cell is not provided
    cell = cell === "" ? account : cell;
    // Generate reference if not provided
    ref = ref === null ? "V-" + new Reference().generate(8) : ref;
    // Default description if not provided
    description = description === "" ? "Payment with ref:" + ref : description;

    // Construct and return payment payload
    return {
      reference: ref,
      cod: isCod,
      coc: isCoc,
      description: description,
      amount: amount,
      customer: {
        firstName: account,
        surname: account,
        middleName: "-",
        nationalId: "-",
        email: `${account}@contipay.co.zw`,
        cell: cell,
        countryCode: "zw",
      },
      currencyCode: currency,
      merchantId: this.merchantId,
      webhookUrl: this.webhookUrl,
      successUrl: this.successUrl,
      cancelUrl: this.cancelUrl,
    };
  }
}

module.exports = SimpleRedirectMethod;
