const express = require('express')
const app = express()
const path = require('path')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration)
const bodyParser = require('body-parser')

app.locals = [
  {itemId:0, price:"5.00",descrition:"Its yellow and tasty",title:"banana", imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/1200px-Banana-Single.jpg"},
  {itemId:1, price:"3.50",descrition:"Quite possibly the best item ever on the human market",title:"Bowler Hat", imgUrl:"https://media.christys-hats.com/catalog/product/cache/1/thumbnail/600x600/9df78eab33525d08d6e5fb8d27136e95/c/s/cst100004.jpg"},
  {itemId:2,price:"9.99",descrition:"If you are feeling low...",title:"Banana Stand Supplies",imgUrl:"http://empowereddollar.com/wp-content/uploads/banana-stand1.jpg"}
]

app.use(bodyParser.json())

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"))
})

app.post('/api/v1/checkout', (req, res) => {
  const info =  req.body
  database('order-history').insert(info)
  .then(info => res.status(201).res.json(info,"total"))
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

module.exports = app
