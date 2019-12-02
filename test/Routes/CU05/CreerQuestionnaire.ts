import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('CU05-CreerQuestionnaire', () => {
    it('should be html', async () => {
        let res = await chai.request(app).get('/Questionnaire/Voir/demarrer/');
        expect(res).to.be.html;
        res = await chai.request(app).get('/Questionnaire/Voir/choisirCours/1');
        expect(res).to.be.html;
    });

    it('should be html', async () => {
        let res = await chai.request(app).get('/Questionnaire/Voir/choisirQuestionnaire/1?idCours=1');
        expect(res).to.be.html;
    });


    it('should see items from the list', async () => {
        const res = await chai.request(app).get('/Questionnaire/Creer/demarrer/');
        expect(res.text).to.contain('1 , LOG210 , 01, Nombre Questionnaire : 1');
        expect(res.text).to.contain('2 , LOG210 , 02, Nombre Questionnaire : 0');
        expect(res.text).to.contain('3 , LOG210 , 03, Nombre Questionnaire : 0');
        expect(res.text).to.contain('4 , LOG210 , 04, Nombre Questionnaire : 0');
        expect(res.text).to.contain('5 , LOG430 , 01, Nombre Questionnaire : 0');
        expect(res.text).to.contain('6 , LOG430 , 02, Nombre Questionnaire : 0');
        expect(res.text).to.contain('Choisir le cours');
        expect(res.text).to.contain('Retour a l\'accueil');
    });

    it('should see items from the list', async () => {
        const res = await chai.request(app).get('/Questionnaire/Creer/choisirCours/1');
        expect(res.text).to.contain('Liste des questionnaires');
        expect(res.text).to.contain('1 , Questionnaire 1');
        expect(res.text).to.contain('État:');
        expect(res.text).to.contain('Actif');
        expect(res.text).to.contain('Description du questionnaire');
        expect(res.text).to.contain('Créer le questionnaire');
    });

    it('should see items from the list', async () => {
        const res = await chai.request(app).get('/Questionnaire/Creer/choisircategorie/rsfg/0/1');

    });

    it('should see items from the list', async () => {
        const res = await chai.request(app).get('/Questionnaire/Creer/choisirQuestion/0/2');

    });

});