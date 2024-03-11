const Reference = require("../utils/reference");

class SimpleDirectMethod {
  constructor(merchantId, webhookUrl, successUrl = "", cancelUrl = "") {
    // Initialize class properties
    this.successUrl = successUrl;
    this.cancelUrl = cancelUrl;
    this.webhookUrl = webhookUrl;
    this.providerName = "";
    this.providerCode = "";
    this.merchantId = merchantId;
  }

  // Method to set up payment provider details
  setUpProvider(providerName = "Ecocash", providerCode = "EC") {
    // Set provider name and code
    this.providerName = providerName;
    this.providerCode = providerCode;
    return this;
  }

  // Method to prepare payload for a transaction
  preparePayload(
    amount,
    account,
    currency = "ZWL",
    ref = null,
    description = "",
    cell = ""
  ) {
    // Use account as cell if cell is not provided
    cell = cell === "" ? account : cell;
    // Generate reference if not provided
    ref = ref === null ? "V-" + new Reference().generate(8) : ref;
    // Default description if not provided
    description = description === "" ? "Payment with ref:" + ref : description;

    // Construct and return payment payload
    return {
      customer: {
        nationalId: "-",
        firstName: account,
        middleName: "-",
        surname: "-",
        email: `${account}@contipay.co.zw`,
        cell: cell,
        countryCode: "ZW",
      },
      transaction: {
        providerCode: this.providerCode,
        providerName: this.providerName,
        amount: amount,
        currencyCode: currency,
        description: description,
        webhookUrl: this.webhookUrl,
        merchantId: this.merchantId,
        reference: ref,
      },
      accountDetails: {
        accountNumber: account,
        accountName: "-",
        accountExtra: {
          smsNumber: cell,
          expiry: "122021",
          cvv: "003",
        },
      },
    };
  }
}

module.exports = SimpleDirectMethod; 
