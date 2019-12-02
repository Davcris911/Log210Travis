import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('PageAccueil', () => {

  it('should be html', async () => {
    const res = await chai.request(app).get('/');
    expect(res).to.be.html;
  });

   it('should have the message in body', async () => {
     const res = await chai.request(app).get('/');
     expect(res.text).to.contain('Récupérer cours');
     expect(res.text).to.contain('Récupérer une question');
   });

});
