const axios = require("axios");

class Contipay {
  // Constructor to initialize token and secret
  constructor(token, secret) {
    this.token = token;
    this.secret = secret;
    this.url = ""; // Base URL for Contipay API
    this.paymentMethod = "direct"; // Default payment method
    this.acquireUrl = "acquire/payment"; // URL endpoint for payments
    this.uatURL = "https://api2-test.contipay.co.zw"; // UAT (Development) URL
    this.liveURL = "https://api-v2.contipay.co.zw"; // Live URL
    this.client = null; // Axios HTTP client
  }

  // Method to set Contipay environment mode
  setAppMode(mode = "DEV") {
    // Set the URL based on the mode
    this.url = mode === "DEV" ? this.uatURL : this.liveURL;
    // Initialize the HTTP client
    this.initHttpClient();
    return this;
  }

  // Method to update URLs from the defaults
  updateURL(devURL, liveURL) {
    this.uatURL = devURL;
    this.liveURL = liveURL;
    return this;
  }

  // Method to set payment method
  setPaymentMethod(method = "direct") {
    // Set the payment method based on input
    this.paymentMethod = method === "direct" ? "POST" : "PUT";
    return this;
  }

  // Method to process payment
  async process(payload) {
    try {
      // Make an HTTP request to Contipay API
      const response = await this.client.request({
        method: this.paymentMethod, // HTTP method
        url: `/${this.acquireUrl}`, // API endpoint
        auth: {
          username: this.token,
          password: this.secret,
        },
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        data: payload, // Payload data
      });
      // Return response data
      return response.data;
    } catch (error) {
      // Return error message if request fails
      return { status: "Error", message: error.message };
    }
  }

  // Method to setup HTTP client
  initHttpClient() {
    // Create Axios instance with base URL
    this.client = axios.create({
      baseURL: this.url,
    });
  }
}

module.exports = Contipay;
