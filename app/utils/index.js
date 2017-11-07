/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-11-06 16:01
 * @description
 */

'use strict';
const config = require('../config.json')

module.exports = {
  cors(req, res, next) {
    if (req.headers['access-control-request-headers'] && req.headers['access-control-request-headers'] === 'content-type') {
      // 如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。
      // 因为 patch 请求包含该字段并值为：content-type，所以服务端也设置该字段。
      res.header('Access-Control-Allow-Headers', 'content-type')
    }
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
    next()
  },
  authority(req, res, next) {
    // 如果 referer 存在则进行 referer 校验
    if (req.headers.referer) {
      const isAllowed = config.apiOriginList.split(',').some(item => {
        return req.headers.referer.indexOf(item) === 0
      })
      if (!isAllowed) {
        res.sendStatus(403)
        return
      }
    }

    next()
  }
}