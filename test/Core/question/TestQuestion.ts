import * as chai from 'chai';
import {Reponse} from "../../../src/core/question/Reponse";
import {Question} from "../../../src/core/question/Question";
import {Enseignant} from "../../../src/core/groupe/Enseignant";

const expect = chai.expect;

let question:Question = new Question();
let reponse:Reponse = new Reponse();

interface ObjetDynamique {
    [key: string]: any
}

describe('Getter Setter', () => {
    question.initialize(1, "a", reponse, null);

    it('getId', function() {
        expect(question.getId()).equal(1);
    });
    it('getEnonce', function() {
        expect(question.getEnonce()).equal("a");
    });
    it('getReponse', function() {
        expect(question.getReponse().getId()).equal(-1);
    });
    it('getChoixReponse', function() {
        expect(question.getChoixReponse().length).equal(0);
    });

    it('setId', function() {
        question.setId(3);
        expect(question.getId()).equal(3);
    });
    it('setEnonce', function() {
        question.setEnonce("b");
        expect(question.getEnonce()).equal("b");
    });
    it('setReponse', function() {
        let reponse2:Reponse = new Reponse(5);
        question.setReponse(reponse2);
        expect(question.getReponse().getId()).equal(5);
    });
    it('setChoixReponse', function() {
        question.setChoixReponse(["b"])
        expect(question.getChoixReponse().length).equal(1);
    });
});


describe('Méthode Ajout', () => {

    it('ajouterChoixReponse', function() {
        question.initialize(1, "a", reponse, null);
        question.setChoixReponse([]);
        expect(question.getChoixReponse().length).equal(0);
        question.ajouterChoixReponse("a");
        expect(question.getChoixReponse().length).equal(1);
    });
    it('convertJsonToObject Null', function() {
        question.initialize(1, "a", reponse, null);
        let object = null;
        question.convertJsonToObject(object);
        expect(question.getId()).equal(1);
    });
    it('convertJsonToObject', function() {
        question.initialize(1, "a", reponse, null);
        let object:ObjetDynamique = {};
        object.id_question = 2;
        object.enonce = "a";
        object.choix_reponse = [];
        question.convertJsonToObject(object);
        expect(question.getId()).equal(2);
        expect(question.getEnonce()).equal("a");
        expect(question.getChoixReponse().length).equal(0);
    });
});