const fs = require('fs');
const path = require('path');
const util = require('util');
const config = require('config');
const _ = require('lodash');
const axios = require('axios');
const moment = require('moment');
const CryptoJS = require('crypto-js');
const HmacSHA256 = require('crypto-js/hmac-sha256')

const U = {};

U.fs = fs;
U.path = path;
U.util = util;
U._ = _;
U.axios = axios;
U.moment = moment;
U.CryptoJS = CryptoJS;
U.HmacSHA256 = HmacSHA256;

// 获取请求体
const getRequestBody = () => {
  const body = {
    AccessKeyId: config.huobi.access_key,
    SignatureMethod: "HmacSHA256",
    SignatureVersion: 2,
    Timestamp: U.moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
  };

  return body;
};

U.getRequestBody = getRequestBody;

// 获取带有签名的params
U.getParams = (method, path, body) => {
  const pars = [];

  for (let k in body) {
    pars.push(`${k}=${encodeURIComponent(body[k])}`);
  }

  const params = pars.join('&');

  const meta = [method, config.huobi.huobi_api, path, params].join('\n')

  const hash = HmacSHA256(meta, config.huobi.secretkey);

  const encodedSign = encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));

  const paramsWithSign = `${params}&Signature=${encodedSign}`;

  return paramsWithSign;
};

module.exports = U;
