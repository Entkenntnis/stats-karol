const express = require('express')

module.exports = (App) => {
  App.express = express()

  App.express.use(express.json())
  App.express.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

  // manage CORS
  App.express.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Methods',
      'GET, PUT, POST, DELETE, OPTIONS'
    )
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With'
    )

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      res.sendStatus(200)
    } else {
      next()
    }
  })
}
