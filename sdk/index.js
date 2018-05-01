const config = require('config');
const U = require('../lib/utils');
const request = require('../lib/request');


const getMarket = async () => {
  const method = 'GET';

  const path = '/market';

  const body = U.getRequestBody();

  const params = U.getParams(method, path, body);

  const url = `${path}?${params}`;

  const options = {
    method: method.toLowerCase(),
    url,
  };

  const market = await request(options);

  return market;
};


// 获取账户信息
const getAccount = async () => {
  const method = 'GET';

  const path = '/v1/account/accounts';

  const body = U.getRequestBody();

  const params = U.getParams(method, path, body);

  const url = `${path}?${params}`;

  const options = {
    method: method.toLowerCase(),
    url,
  };

  const account = await request(options);

  return account;
};

const getBalance = async () => {
  const method = 'GET';
  const accountId = config.huobi.account_id_pro;
  const path = `/v1/account/accounts/${accountId}/balance`;
  const body = U.getRequestBody();
  const params = U.getParams(method, path, body);

  const url = `${path}?${params}`;

  const options = {
    method: method.toLowerCase(),
    url,
  };

  const balance = await request(options);

  return balance;
};

const getOpenOrders = async (symbol) => {
  const method = 'GET';

  const path = `/v1/order/orders`;

  const body = U.getRequestBody();

  body.symbol = symbol;
  body.states = 'submitted,partial-filled';

  const params = U.getParams(method, path, body);

  const url = `${path}?${params}`;

  const options = {
    method: method.toLowerCase(),
    url,
  };

  const openOrders = await request(options);

  return openOrders;
};

const getOrder = async (orderId) => {
  const method = 'GET';

  const path = `/v1/order/orders/${order_id}`;

  const body = U.getRequestBody();

  const params = U.getParams(method, path, body);

  const url = `${path}?${params}`;

  const options = {
    method: method.toLowerCase(),
    url,
  };

  const order = await request(options);

  return order;
};

const buyLimit = async (symbol, amount, price) => {
  const method = 'POST';

  const path = '/v1/order/orders/place';

  const data = U.getRequestBody();

  const params = U.getParams(method, path, data);

  data["account-id"] = config.huobi.account_id_pro;
  data.type = "buy-limit";
  data.amount = amount;
  data.symbol = symbol;
  data.price = price;

  const url = `${path}?${params}`;

  const options = {
    method: method.toLowerCase(),
    url,
    data,
  };

  const buyLimit = await request(options);

  return buyLimit;
};

const sellLimit = async (symbol, amount, price) => {
  const method = 'POST';

  const path = '/v1/order/orders/place';

  const data = U.getRequestBody();

  const params = U.getParams(method, path, data);

  data["account-id"] = config.huobi.account_id_pro;
  data.type = "sell-limit";
  data.amount = amount;
  data.symbol = symbol;
  data.price = price;

  const url = `${path}?${params}`;

  const options = {
    method: method.toLowerCase(),
    url,
    data,
  };

  const sellLimit = await request(options);

  return sellLimit;
};

const undoOrder = async (address, coin, amount, paymentId) => {
  const method = 'POST';

  const path = `/v1/dw/withdraw/api/create`;

  const data = U.getRequestBody();

  const params = U.getParams(method, path, data);


  data.address = address;
  data.amount = amount;
  data.currency = coin;

  if (coin.toLowerCase() == 'xrp') {
    if (!paymentId) {
      throw new Error('no paymentId');
    }

    data['addr-tag'] = paymentId;
  }

  const url = `${path}?${params}`;

  const options = {
    method: method.toLowerCase(),
    url,
    data,
  };

  const undoOrder = await request(options);

  return undoOrder;
};

module.exports = {
  getMarket,
  getAccount,
  getBalance,
  getOrder,
  buyLimit,
  sellLimit,
  undoOrder,
};
