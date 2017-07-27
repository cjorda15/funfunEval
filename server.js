const express = require('express')
const app = express()
const path = require('path')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration)
const bodyParser = require('body-parser')

app.locals = [{itemId:0, price:"5.00",descrition:"its simply amazing",title:"wonderful thingie ma jig"},{itemId:1, price:"3.50",descrition:"for your inner Lockness monster",title:"its a sp joke"},{itemId:2,price:"9.99",descrition:"its the number that goes round",title:"life's grand, lets make it grander"}]

app.use(bodyParser.json())

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"))
})

app.post('/api/v1/checkout', (req, res) => {
  const info =  req.body
  database('order-history').insert(info)
  .then(info => {res.status(201).res.json(info)})
  .catch(error => {res.status(500).send(error)
  })
})

app.get('/api/v1/checkout', (req,res) => {
  database('order-history').select()
  .then((info) => res.status(200).json(info))
  .catch(error => {res.status(500).send("error", error)})
})

app.get('/api/v1/items', (req,res) => {
  res.json(app.locals)
})

app.use('/assets', express.static(__dirname + "/public"))

app.use('/build', express.static(__dirname+'/build'))

app.listen(process.env.PORT || 3000)
