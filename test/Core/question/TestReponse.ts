import * as chai from 'chai';
import {Reponse} from "../../../src/core/question/Reponse";
import {Enseignant} from "../../../src/core/groupe/Enseignant";

const expect = chai.expect;

let reponse:Reponse = new Reponse(1);
interface ObjetDynamique {
    [key: string]: any
}

describe('Getter Setter', () => {

    it('getId', function() {
        expect(reponse.getId()).equal(1);
    });
    it('getNumeroReponse', function() {
        expect(reponse.getNumeroReponse()).equal(undefined);
    });
    it('getListeTexteReponse', function() {
        expect(reponse.getListeTexteReponse().length).equal(0);
    });

    it('setId', function() {
        reponse.setId(3);
        expect(reponse.getId()).equal(3);
    });
    it('setNumeroReponse', function() {
        reponse.setNumeroReponse(1)
        expect(reponse.getNumeroReponse()).equal(1);
    });
    it('setListeTexteReponse', function() {
        reponse.setListeTexteReponse(["a"])
        expect(reponse.getListeTexteReponse().length).equal(1);
    });

    it('getBonneReponse vide', function() {
        reponse.setNumeroReponse(null);
        expect(reponse.getBonneReponse()).equal(undefined);
    });
    it('getBonneReponse Contient reponse', function() {
        reponse.setNumeroReponse(0);
        reponse.setListeTexteReponse(["a"]);
        expect(reponse.getBonneReponse()).equal("a");
    });

    it('ajouterBonneReponse', function() {
        reponse.setNumeroReponse(0);
        reponse.setListeTexteReponse(["a"]);
        expect(reponse.getBonneReponse()).equal("a");
        reponse.ajouterBonneReponse("b")
        expect(reponse.getBonneReponse()).equal("b");
        expect(reponse.getListeTexteReponse().length).equal(1);
    });
    it('ajouterBonneReponse Null', function() {
        reponse.setNumeroReponse(null);
        reponse.setListeTexteReponse(["a"]);
        reponse.ajouterBonneReponse("b")
        expect(reponse.getBonneReponse()).equal("b");
    });

    it('ajouterMauvaiseReponse', function() {
        let reponse2:Reponse = new Reponse(5);
        reponse2.ajouterMauvaiseReponse("b");
        expect(reponse2.getListeTexteReponse().length).equal(1);
    });

    it('convertJsonToObject Null', function() {
        let reponse:Reponse = new Reponse(6);
        let object = null;
        reponse.convertJsonToObject(object);
        expect(reponse.getId()).equal(6);
    });
    it('convertJsonToObject', function() {
        let reponse:Reponse = new Reponse();
        reponse = new Reponse(6);
        let object:ObjetDynamique = {};
        object.id_reponse = 2;
        object.numero_reponse = 1;
        object.explication_reponse = [];

        reponse.convertJsonToObject(object);
        expect(reponse.getId()).equal(2);
        expect(reponse.getNumeroReponse()).equal(1);
        expect(reponse.getListeTexteReponse().length).equal(0);
    });
});