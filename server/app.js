import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import index from './routes/index'
import user from './routes/user'
import supervisor from './routes/supervisor'
import team from './routes/team'
import requests from './routes/requests'

dotenv.config()

const app = express()

if (process.env.NODE_ENV !== 'dev') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, ['https://', req.get('Host'), req.url].join(''))
    }
    return next()
  })
}

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(cookieParser())

app.use('/api', index)
app.use('/api/user', user)
app.use('/api/supervisor', supervisor)
app.use('/api/team', team)
app.use('/api/requests', requests)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
