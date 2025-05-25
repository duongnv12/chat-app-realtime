const CircuitBreaker = require('opossum');

const options = {
  timeout: 5000,
  errorThresholdPercentage: 50,
  resetTimeout: 10000,
};

const breaker = new CircuitBreaker(async (fn) => fn(), options);

module.exports = breaker;
