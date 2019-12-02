import * as chai from 'chai';
import {Etudiant} from "../../../src/core/groupe/Etudiant";

const expect = chai.expect;

let etudiant:Etudiant = new Etudiant();
var object;

describe('Getter Setter', () => {
    etudiant.initialize(1, "a", "b", "a@a", "aaa");

    it('getId', function() {
        expect(etudiant.getId()).equal(1);
    });
    it('getPrenom', function() {
        expect(etudiant.getPrenom()).equal("a");
    });
    it('getNomFamille', function() {
        expect(etudiant.getNomFamille()).equal("b");
    });
    it('getEmail', function() {
        expect(etudiant.getEmail()).equal("a@a");
    });
    it('getCodePermanent', function() {
        expect(etudiant.getCodePermanent()).equal("aaa");
    });

    it('setId', function() {
        etudiant.setId(2);
        expect(etudiant.getId()).equal(2);
    });
    it('setPrenom', function() {
        etudiant.setPrenom("ccc");
        expect(etudiant.getPrenom()).equal("ccc");
    });
    it('setNomFamille', function() {
        etudiant.setNomFamille("ddd");
        expect(etudiant.getNomFamille()).equal("ddd");
    });
    it('setEmail', function() {
        etudiant.setEmail("aaaaaa@aa");
        expect(etudiant.getEmail()).equal("aaaaaa@aa");
    });
    it('setCodePermanent', function() {
        etudiant.setCodePermanent("bcn");
        expect(etudiant.getCodePermanent()).equal("bcn");
    });

});

describe('Méthodes', () => {

    it('convertJsonToObject Null', function() {
        etudiant.initialize(1, "a", "b", "a@a", "aaa");
        let object;
        object = null;
        etudiant.convertJsonToObject(object);
        expect(etudiant.getPrenom()).equal("a");
    });
    it('convertJsonToObject', function() {
        etudiant.initialize(1, "a", "b", "a@a", "aaa");
        interface ObjetDynamique {
            [key: string]: any
        }
        let object:ObjetDynamique = {};
        object.id = 3;
        object.permanent_code = "test";
        object.email = "test@test";
        object.first_name = "test";
        object.last_name = "test";
        etudiant.convertJsonToObject(object);
        expect(etudiant.getId()).equal(3);
        expect(etudiant.getPrenom()).equal("test");
        expect(etudiant.getNomFamille()).equal("test");
        expect(etudiant.getEmail()).equal("test@test");
        expect(etudiant.getCodePermanent()).equal("test");

    });

});