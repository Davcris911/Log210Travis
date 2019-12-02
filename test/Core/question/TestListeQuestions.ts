import * as chai from 'chai';
import {Reponse} from "../../../src/core/question/Reponse";
import {Question} from "../../../src/core/question/Question";
import {ListeQuestions} from "../../../src/core/question/ListeQuestions";

const expect = chai.expect;

let liste:ListeQuestions = new ListeQuestions()

let reponse:Reponse = new Reponse();
let question:Question = new Question();
question.initialize(1, "a", reponse, null);
let question2:Question = new Question();
question2.initialize(2, "b", reponse, null);

describe('Getter Setter', () => {
    it('setListe', function() {
        liste.setListeQuestion([]);
        expect(liste.getListeQuestion().length).equal(0);
    });
    it('setListe Avec liste', function() {
        liste.setListeQuestion([question, question2]);
        expect(liste.getListeQuestion().length).equal(2);
    });

    it('getQuestion question Non existante', function() {
        liste.setListeQuestion([question, question2]);
        expect(liste.getQuestion(3)).equal(undefined);
    });
    it('getQuestion question existante', function() {
        liste.setListeQuestion([question, question2]);
        expect(liste.getQuestion(1).getEnonce()).equal("a");
    });
});

describe('Méthodes', () => {
    liste.setListeQuestion([question, question2]);

    it('afficherQuestion', function() {
        liste.setListeQuestion([question, question2]);
        expect(liste.afficherQuestion(2).getEnonce()).equal("b");
    });
    it('afficherQuestion non existante', function() {
        liste.setListeQuestion([question, question2]);
        expect(liste.afficherQuestion(5)).equal(undefined);
    });

    it('modifierQUestion', function() {
        liste.setListeQuestion([question, question2]);
        liste.modifierQuestion(1);
        expect(liste.getQuestion(9999).getEnonce()).equal("a");
    });

    it('supprimerQuestion', function() {
        liste.setListeQuestion([question, question2]);
        liste.supprimerQuestion(2);
        expect(liste.getListeQuestion().length).equal(1);
    });
});