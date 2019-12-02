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
        let res = await chai.request(app).get('/Devoir/Voir/correctionDevoir/1?idCours=1');
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
        const res = await chai.request(app).get('/Devoir/Voir/choisirCours/1');
        expect(res.text).to.contain('1 , Premier Devoir');
        expect(res.text).to.contain('2 , deux Devoir');
        expect(res.text).to.contain('3 , tres Devoir');
        expect(res.text).to.contain('Continuer affichage devoir cours différent');
        expect(res.text).to.contain('Terminer visionnement devoirs');
        expect(res.text).to.contain('Choisir le devoir');
        expect(res.text).to.contain('Supprimer le devoir');
        expect(res.text).to.contain('Corriger le devoir');
    });

});