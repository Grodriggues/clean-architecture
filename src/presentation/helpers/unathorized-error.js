module.exports = class unauthorizedError extends Error {
  constructor(paramName) {
    super(`Missing param: ${paramName}`);
    this.name = "unauthorized error";
  }
};
