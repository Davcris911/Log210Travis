import * as chai from 'chai';
import {Ctrl04} from "../../src/controller/Ctrl04";
import {RouteCommune} from "../../src/routes/RouteCommune";

const expect = chai.expect;

let ctrl:Ctrl04 = new Ctrl04();

describe('Methodes', () => {
    it('getListeCours', function() {
        expect(ctrl.getListeCours().getListeCours().length).equal(4);
    });
    it('getListeDevoir', function() {
        expect(ctrl.getListeDevoir().getListeDevoir().length).equal(5);
    });
    it('getNbDevoirParCours', function() {
        expect(ctrl.getNbDevoirParCours().get(1)).equal(3);
    });
    it('getDevoirParCours', function() {
        expect(ctrl.getDevoirParCours(1).length).equal(3);
    });
    it('getDevoir', function() {
        expect(ctrl.getDevoir(1).getNoteMaximale()).equal(100);
    });
});