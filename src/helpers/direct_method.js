const Reference = require("../utils/reference"); 

class DirectMethod {
  constructor(merchantCode, webhookUrl) {
    this.merchantCode = merchantCode;
    this.webhookUrl = webhookUrl;
    this.providerName = "Ecocash";
    this.providerCode = "EC";
    this.firstName = "";
    this.lastName = "";
    this.cell = "";
    this.email = "";
    this.middleName = "-";
    this.nationalId = "-";
    this.countryCode = "ZW";
    this.account = "";
    this.accountName = "-";
    this.accountExpiry = "-";
    this.cvv = "";
    this.amount = 0;
    this.ref = "";
    this.currency = "ZWL";
    this.description = "";
  }

  setUpProvider(providerName = "Ecocash", providerCode = "EC") {
    this.providerName = providerName;
    this.providerCode = providerCode;
    return this;
  }

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

  setUpTransaction(
    amount,
    currency = "ZWL",
    transactionRef = "",
    transactionDescription = ""
  ) {
    const ref =
      transactionRef === ""
        ? "V-" + new Reference().generate(8)
        : transactionRef;
    const description =
      transactionDescription === ""
        ? "Payment with ref:" + ref
        : transactionDescription;

    this.amount = amount;
    this.currency = currency;
    this.ref = ref;
    this.description = description;
    return this;
  }

  setUpAccountDetails(
    account = "",
    accountName = "-",
    accountExpiry = "-",
    cvv = ""
  ) {
    this.account = account === "" ? this.cell : account;
    this.accountName = accountName;
    this.accountExpiry = accountExpiry;
    this.cvv = cvv;
    return this;
  }

  preparePayload() {
    return {
      customer: {
        nationalId: this.nationalId,
        firstName: this.firstName,
        middleName: this.middleName,
        surname: this.lastName,
        email: this.email,
        cell: this.cell,
        countryCode: this.countryCode,
      },
      transaction: {
        providerCode: this.providerCode,
        providerName: this.providerName,
        amount: this.amount,
        currencyCode: this.currency,
        description: this.description,
        webhookUrl: this.webhookUrl,
        merchantId: this.merchantCode,
        reference: this.ref,
      },
      accountDetails: {
        accountNumber: this.account,
        accountName: this.accountName,
        accountExtra: {
          smsNumber: this.cell,
          expiry: this.accountExpiry,
          cvv: this.cvv,
        },
      },
    };
  }
}

module.exports = DirectMethod;
