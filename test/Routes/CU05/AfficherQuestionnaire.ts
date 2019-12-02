import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('CU05-AfficherQuestionnaire', () => {

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
        const res = await chai.request(app).get('/Questionnaire/Voir/demarrer/');
        expect(res.text).to.contain('1 , LOG210 , 01, Nombre Questionnaire : 1');
        expect(res.text).to.contain('2 , LOG210 , 02, Nombre Questionnaire : 0');
        expect(res.text).to.contain('Choisir le cours');
        expect(res.text).to.contain('Retour a l\'accueil');
    });

    it('should see items from the list', async () => {
        const res = await chai.request(app).get('/Questionnaire/Voir/choisirCours/1');
        expect(res.text).to.contain('1 , Questionnaire 1');
        expect(res.text).to.contain('Continuer affichage questionnaire cours différent');
        expect(res.text).to.contain('Terminer visionnement questionnaires');
        expect(res.text).to.contain('Choisir le questionnaire');
    });

    it('should see items from the list', async () => {
        /*
        const res = await chai.request(app).get('/Questionnaire/Voir/choisirQuestionnaire/1?idCours=1');
        expect(res.text).to.contain('Identifiant : 1');
        expect(res.text).to.contain('Etat : Actif');
        expect(res.text).to.contain('Id question : 1');
        expect(res.text).to.contain('Enonce : Quelle est la couleur du cheval blanc de Napoléon');
        expect(res.text).to.contain('Id question : 2');
        expect(res.text).to.contain('Enonce : aaaaaaaaa');
         */
    });
});