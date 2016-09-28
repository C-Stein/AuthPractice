"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const { connect } = require('./database')

const routes = require('./routes/') //ending in "/" defaults to "index"
const db = require('./database')

 const port = process.env.PORT || 3000
 app.set('port', port)

app.set('view engine', 'pug');

app.locals.errors = {}
app.locals.body = {}

//Middlewares
app.use(bodyParser.urlencoded({ extended: false})) //gives you a req.body

app.use(session({
  'store': new RedisStore({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  }),
  'secret': 'supersecretkey' //fine to put this on github
}))

app.use((req, res, next) => {
  app.locals.email = req.session.email
  console.log("user-mail: ", app.locals.email);
  next()
})

//app.use(express.static('public'))


app.use(routes)//"routes" has to be a function


//listen
connect()
  .then(() => {
    app.listen(port, () => {
    console.log(`Hey, I'm listening on port ${port}`);
    })
  })
  .catch(console.error)
