import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('CU01-RecupererCours', () => {

    it('should be html', async () => {
        const res = await chai.request(app).get('/Groupe/voirListeCours/');
        expect(res).to.be.html;
    });

    it('should be html', async () => {
        const res = await chai.request(app).get('/Groupe/voirListeCours/');
        expect(res).to.be.html;
    });

    it('should see items from the list', async () => {
        /*
        const res = await chai.request(app).get('/Groupe/voirListeCours/');
        expect(res.text).to.contain('LOG430');
        expect(res.text).to.contain('LOG210');
        expect(res.text).to.contain('Identifiant du cours');
        expect(res.text).to.contain('Choisir le cours');
        expect(res.text).to.contain('Retour a l');
         */
    });


    it('should see the attribut of the item', async () => {
        const res = await chai.request(app).get('/Groupe/choisirCours/1');
        /*
        expect(res.text).to.contain('Identifiant : 1');
        expect(res.text).to.contain('Sigle : LOG210');
        expect(res.text).to.contain('Nombre maximal d\'étudiants : 5');
        expect(res.text).to.contain('Groupe : 01');
        expect(res.text).to.contain('Titre : Analyse et conception de logiciels');
        expect(res.text).to.contain('Date de début du cours : 2019-09-03');
        expect(res.text).to.contain('Date de fin du cours : 2019-09-03');

        expect(res.text).to.contain('firstname1 , last_name1 , student+1@gmail.com , lastf1');
        expect(res.text).to.contain('firstname2 , last_name2 , student+2@gmail.com , lastf2');
        expect(res.text).to.contain('firstname3 , last_name3 , student+3@gmail.com , lastf3');
        expect(res.text).to.contain('firstname4 , last_name4 , student+4@gmail.com , lastf4');
         */
    });
});
