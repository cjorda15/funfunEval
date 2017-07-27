process.env.NODE_ENV = 'test';
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server.js')
const knex = require('../db/knex.js')

chai.use(chaiHttp)

describe('Routes', () => {
  it('should return when it hits the homepage',(done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200)
      res.should.be.html
      done()
    })
  })

  it('should provide a sad path', (done) => {
    chai.request(server)
    .get('/sadPath')
    .end((err,res) => {
      res.should.have.status(404)
      done()
    })
  })

  // { itemId: 0,
  //     price: '5.00',
  //     descrition: 'Its yellow and tasty',
  //     title: 'banana' }

  it('should a list of products', (done) => {
    chai.request(server)
      .get('/api/v1/items')
      .end((err, res) => {
        console.log(res.body[0].title)
        res.should.have.status(200)
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(3);
        res.body[0].itemId.should.equal(0)
        res.body[0].price.should.equal("5.00")
        res.body[0].descrition.should.equal("Its yellow and tasty")
        res.body[0].title.should.equal("banana")
        done()
      })
    })

    it('should insert a history of the order history',(done) => {
        chai.request(server)
        .put('/api/v1/checkout')
        .send({
          total:"190192.12"
        })
        .end((err,res) => {
          console.log(res,"!@#$")
        res.should.have.status(200)
        res.body.should.equal(1)
        done()
      })
    })

    // it('should get a order history')
})
