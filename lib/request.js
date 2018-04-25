const config = require('config');
const CryptoJS = require('crypto-js');
const U = require('./utils');

// 获取授权信息，用于买入、卖出
const getAuthData = () => {
  const sign = config.huobi.trade_password + 'hello, moto';
  const md5 = CryptoJS.MD5(sign).toString().toLowerCase();
  const authData = encodeURIComponent(JSON.stringify({
    assetPwd: md5
  }));
  return authData;
};

const service = U.axios.create({
  baseURL: `https://${config.huobi.huobi_api}`, // api的base_url
  timeout: 5000 // request timeout
});

service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36';
  config.headers.AuthData = getAuthData();
  return config;
}, error => {
  return Promise.reject(error);
});

service.interceptors.response.use(
  response => {
    const { data } = response;
    const json = U._.isString(data) ? JSON.parse(data) : data;
    if (json.status === 'ok') {
      return json.data;
    }
    return Promise.reject(json);
  },
  error => {
    console.log('Error: ', error);
    return Promise.reject(error);
  });

module.exports = service;
