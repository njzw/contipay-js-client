class Reference {
  /**
   * Generate a reference number with the specified length.
   *
   * @param {number} len The length of the reference number (default: 6).
   * @param {number|null} number An optional number to use in the reference (default: null).
   * @return {string} The generated reference number.
   */
  generate(len = 6, number = null) {
    const input =
      number !== null ? number : Math.floor(Math.random() * 10 ** len);

    return String(input).padStart(len, "0");
  }
}

module.exports = Reference;
