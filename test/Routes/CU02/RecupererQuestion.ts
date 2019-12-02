import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('CU02-RecupererQuestion', () => {

    it('should be html', async () => {
        const res = await chai.request(app).get('/Question/voirListeQuestions/');
        expect(res).to.be.html;
    });

    it('should be html', async () => {
        const res = await chai.request(app).get('/Question/voirListeQuestions/');
        expect(res).to.be.html;
    });

    it('should see items from the list', async () => {
        const res = await chai.request(app).get('/Question/voirListeQuestions/');
        expect(res.text).to.contain('Quelle est la couleur du cheval blanc de Napoléon');
        expect(res.text).to.contain('Choisir la question');
        expect(res.text).to.contain('Identifiant de la question');
        expect(res.text).to.contain('Terminer récupération questions');
    });

    it('should see the attribut of the item', async () => {
        const res = await chai.request(app).get('/Question/voirQuestion/1');
        /*
        expect(res.text).to.contain('Identifiant : 1');
        expect(res.text).to.contain('Enonce : Quelle est la couleur du cheval blanc de Napoléon');
        expect(res.text).to.contain('ChoixReponse : blanc');
        expect(res.text).to.contain('ChoixReponse : noir');
        expect(res.text).to.contain('Reponse : Bravo');
        expect(res.text).to.contain('Reponse : Il était Blanc le cheval');
        expect(res.text).to.contain('Continuer recupération');
        expect(res.text).to.contain('Terminer la récupération');
         */
    });
});
