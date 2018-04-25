const config = require('config');
const U = require('../lib/utils');
const request = require('../lib/request');


// 获取账户信息
const getAccount = async () => {
  const method = 'GET';

  const path = '/v1/account/accounts';

  const params = U.getParams(method, path);

  const url = `${path}?${params}`;

  const options = {
    method: method.toLowerCase(),
    url,
  };

  const account = await request(options);

  return account;
};

module.exports = {
  getAccount,
};
