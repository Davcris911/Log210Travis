import * as chai from 'chai';
import {Ctrl01} from "../../src/controller/Ctrl01";
import {ListeCours} from "../../src/core/groupe/ListeCours";

const expect = chai.expect;

let ctrl:Ctrl01 = new Ctrl01();
ctrl.init();

describe('Methodes', () => {
    it('getListeCours', function() {
        ctrl.init();
        expect(ctrl.getListeCours().getListeCours().length).equal(4);
    });

    it('getListeSGB et Demarrer', function() {
        expect(ctrl.getListeSGB()).equal(undefined);
        ctrl.demarrer();
        ctrl.demarrer();
        expect(ctrl.getListeSGB().getListeCours().length).equal(8);
    });

    it('getListeSigleCours', function() {
        expect(ctrl.getListeSigleCours()).contain("1,2");
    });

    it('ajouter', function() {
        ctrl.ajouterCours(6);
        expect(ctrl.getListeCours().getListeCours().length).equal(5);
    });

    it('afficher', function() {
        expect(ctrl.afficherCours(1).getSigle()).equal('LOG210');
    });

    it('supprimer', function() {
        ctrl.init();
        ctrl.supprimerCours(2);
        expect(ctrl.getListeCours().getListeCours().length).equal(3);
    });
});