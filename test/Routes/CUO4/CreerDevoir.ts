import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('CU04-CreerDevoir', () => {
    it('should be html', async () => {
        let res = await chai.request(app).get('/Devoir/Voir/demarrer/');
        expect(res).to.be.html;
        res = await chai.request(app).get('/Devoir/Voir/choisirCours/1');
        expect(res).to.be.html;
    });

    it('should be html', async () => {
        let res = await chai.request(app).get('/Devoir/Voir/choisirDevoir/1?idCours=1');
        expect(res).to.be.html;
    });


    it('should see items from the list', async () => {
        const res = await chai.request(app).get('/Devoir/Creer/demarrer/');
        expect(res.text).to.contain('1 , LOG210 , 01, Nombre Devoir : 3');
        expect(res.text).to.contain('2 , LOG210 , 02, Nombre Devoir : 2');
        expect(res.text).to.contain('3 , LOG210 , 03, Nombre Devoir : 0');
        expect(res.text).to.contain('4 , LOG210 , 04, Nombre Devoir : 0');
        expect(res.text).to.contain('Choisir le cours');
        expect(res.text).to.contain('Retour a l\'accueil');
    });

    it('should see items from the list', async () => {
        const res = await chai.request(app).get('/Devoir/Creer/choisirCours/1');
        expect(res.text).to.contain('Liste des devoirs');
        expect(res.text).to.contain('1 , Premier Devoir');
        expect(res.text).to.contain('2 , deux Devoir');
        expect(res.text).to.contain('3 , tres Devoir');
        expect(res.text).to.contain('État:');
        expect(res.text).to.contain('Visible');
        expect(res.text).to.contain('Description du devoir');
        expect(res.text).to.contain('Note maximum du devoir');
        expect(res.text).to.contain('Date Debut Devoir :');
        expect(res.text).to.contain('mm/dd/yyyy');
        expect(res.text).to.contain('Date Fin Devoir :');
        expect(res.text).to.contain('mm/dd/yyyy');
        expect(res.text).to.contain('Créer le devoir');
        expect(res.text).to.contain('Terminer création devoir');
    });

});