const sdk = require('../sdk');

const testGetAccount = async () => {
  const account = await sdk.getAccount();
  return account;
};

const main = () => {
  (async () => {
    try {
      const account = await testGetAccount();
      console.log(account);
    } catch (error) {
      console.error('Error: ', error);
    }
  })();
};

main();
