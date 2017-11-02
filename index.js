/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-11-01 18:40
 * @description
 */

const express = require('express')
require('mock-server')

const app = express()

MS.init({
  app,
  appDir: __dirname
})

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})