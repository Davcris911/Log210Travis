import * as chai from 'chai';
import {Etudiant} from "../../../src/core/groupe/Etudiant";
import {Enseignant} from "../../../src/core/groupe/Enseignant";

const expect = chai.expect;

let enseignant:Enseignant;

describe('Getter Setter', () => {
    enseignant = new Enseignant(1, "david", "benjamin", "d@b");

    it('getId', function() {
        expect(enseignant.getId()).equal(1);
    });
    it('getPrenom', function() {
        expect(enseignant.getPrenom()).equal("david");
    });
    it('getNomFamille', function() {
        expect(enseignant.getNomFamille()).equal("benjamin");
    });
    it('getEmail', function() {
        expect(enseignant.getEmail()).equal("d@b");
    });

    it('setId', function() {
        enseignant.setId(2);
        expect(enseignant.getId()).equal(2);
    });
    it('setPrenom', function() {
        enseignant.setPrenom("test");
        expect(enseignant.getPrenom()).equal("test");
    });
    it('setNomFamille', function() {
        enseignant.setNomFamille("test");
        expect(enseignant.getNomFamille()).equal("test");
    });
    it('setEmail', function() {
        enseignant.setEmail("test@Test");
        expect(enseignant.getEmail()).equal("test@Test");
    });
});


describe('Méthodes', () => {
    it('convertJsonToObject Null', function() {
        enseignant = new Enseignant(1, "david", "benjamin", "d@b");
        let object = null;
        enseignant.convertJsonToObject(object);
        expect(enseignant.getId()).equal(1);
    });
    it('convertJsonToObject', function() {
        interface ObjetDynamique {
            [key: string]: any
        }
        enseignant = new Enseignant(1, "david", "benjamin", "d@b");
        let object:ObjetDynamique = {};
        object.id = 2;
        object.first_name = "da";
        object.last_name = "da";
        object.email = "da";
        enseignant.convertJsonToObject(object);
        expect(enseignant.getId()).equal(2);
        expect(enseignant.getEmail()).equal("da");
        expect(enseignant.getPrenom()).equal("da");
        expect(enseignant.getNomFamille()).equal("da");
    });
});