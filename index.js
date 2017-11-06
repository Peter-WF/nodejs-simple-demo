/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2017-11-01 18:40
 * @description
 */

const express = require('express')
require('nodejs-mock-server')

const utils = require('./utils')

const config = require('./config.json')

const app = express()

MS.init({
  app,
  appDir: __dirname
})

// add intercept
app.use('/api/*', MS.intercept(), function(req, res, next) {
  // 如果 referer 不存在那么返回 404，暂时不添加该限制
  // if (!req.headers.referer) {
  //   res.sendStatus(403)
  //   return
  // }
  const isAllowed = config.apiOriginList.split(',').some(item => {
    return req.headers.referer.indexOf(item) === 0
  })
  if (!isAllowed) {
    res.sendStatus(403)
    return
  }
  utils.cors(req, res)
  next()
})

// get all project
app.get('/api/projects/$', function(req, res) {
  res.send({
    success: true,
    data: [{
      id: '1',
      name: 'project name',
      description: 'my project'
    }, {
      id: '2',
      name: 'project name2',
      description: 'my project2'
    }, {
      id: '3',
      name: 'project name3',
      description: 'my project3'
    }]
  })
})

// create a project
app.post('/api/projects/$', function(req, res) {
  res.send({
    success: true,
    data: {
      id: '4',
      name: 'new project name',
      description: 'new project'
    }
  })
})

// get project by projectId
app.get('/api/projects/:projectId/$', function(req, res) {
  res.send({
    success: true,
    data: {
      id: '4',
      name: 'new project name',
      description: 'new project'
    }
  })
})

// update project by projectId
app.patch('/api/projects/:projectId/$', function(req, res) {
  res.send({
    success: true,
    data: {
      id: '4',
      name: 'new project name',
      description: 'new project description'
    }
  })
})

// delete project by projectId
app.delete('/api/projects/:projectId/$', function(req, res) {
  res.send({
    success: true
  })
})

app.get('/', function(req, res) {
  res.send('hello world')
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})