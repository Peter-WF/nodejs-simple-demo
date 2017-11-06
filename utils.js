/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-11-06 16:01
 * @description
 */

'use strict';

module.exports = {
  cors(req, res) {
    if (req.headers['access-control-request-headers'] && req.headers['access-control-request-headers'] === 'content-type') {
      // 如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。
      // 因为 patch 请求包含该字段并值为：content-type，所以服务端也设置该字段。
      res.header('Access-Control-Allow-Headers', 'content-type')
    }
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
  }
}