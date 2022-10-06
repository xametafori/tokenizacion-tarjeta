//During the test the env variable is set to test

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);
// Our main block
describe('Cards', () => {
  // Consts
    const id = '633e104b84729a873dd36e3e',
    card_number = '12312312312312',
    successCode = 200;

  /*
  * Test for /POST
  */
  describe('/POST token', () => {
    it('it should POST a token ', done => {
      chai.request(server)
        .post('/api/token')
        .send(token)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('email');
          res.body.should.have.property('card_number');
          res.body.should.have.property('ccv');
          res.body.should.have.property('expiration_year');
          res.body.should.have.property('expiration_month');
          done();
        });
    });
  });
  /*
  * Test for /GET:id
  */
  describe('/GET/:id card', () => {
    it('it should GET a card by the given id', done => {
      chai.request(server)
        .get(`/api/card/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('expiration_token').eql(id);
          res.body.should.have.property('card_number').eql(card_number);
          done();
        });
    });
  });
 
});
