import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('CU05-ModifierQuestionnaire', () => {

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
        const res = await chai.request(app).get('/Questionnaire/Modifier/listeQuestionnaire/1');
        expect(res.text).to.contain('Quelle est la couleur du cheval blanc de Napoléon , Nombre Occurences : 1');
        expect(res.text).to.contain('aaaaaaaaa , Nombre Occurences : 1');
        expect(res.text).to.contain('bbbbbbbb , Nombre Occurences : 1');
        expect(res.text).to.contain('cccccccc , Nombre Occurences : 0');
        expect(res.text).to.contain('ddddddd , Nombre Occurences : 0');
        expect(res.text).to.contain('Terminer création questionnaire');
    });

    it('should see items from the list', async () => {
        const res = await chai.request(app).get('/Questionnaire/Modifier/ajouterQuestions/1/1,2,3');
        expect(res.text).to.contain('Description:');
        expect(res.text).to.contain('Questionnaire 1');
        expect(res.text).to.contain('État:');
        expect(res.text).to.contain('Actif');
    });


});