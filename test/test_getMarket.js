#!/usr/bin/env node

const sdk = require('../sdk');

const testGetMarket = async () => {
  const market = await sdk.getMarket();
  return market;
};

const main = () => {
  (async () => {
    try {
      const market = await testGetMarket();
      console.log(account);
    } catch (error) {
      console.error('Error: ', error);
    }
  })();
};

main();
