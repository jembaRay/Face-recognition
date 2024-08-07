const chai =require('chai')
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
describe('Backend API tests', () => {
    it('get_change of state',async () => {
        //this.timeout(5000);
      chai
        .request('http://localhost:5000') // Replace with your backend URL
        .get('/Login')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
        //   done();
    // const response = await chai.request('http://localhost:3000').get('/api/generators');
    // expect(response).to.have.status(200);
        });
    });
  });