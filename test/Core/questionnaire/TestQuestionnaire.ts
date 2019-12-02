import * as chai from 'chai';

import {Questionnaire} from "../../../src/core/questionnaire/Questionnaire";
import {Cours} from "../../../src/core/groupe/Cours";
import {Question} from "../../../src/core/question/Question";
import {Enseignant} from "../../../src/core/groupe/Enseignant";

const expect = chai.expect;

let cours:Cours = new Cours();
let questionnaire:Questionnaire = new Questionnaire();

interface ObjetDynamique {
    [key: string]: any
}

describe('initialize and Getter', () => {
    questionnaire.initialize(1, "a", true, cours);

    it('getId', function() {
        expect(questionnaire.getId()).equal(1);
    });

    it('getDesc', function() {
        expect(questionnaire.getDescription()).equal("a");
    });

    it('getEtat', function() {
        expect(questionnaire.getEtat()).equal(true);
    });


    it('getCours', function() {
        expect(questionnaire.getCours().getId()).equal(cours.getId());
    });

    it('getQuestion', function() {
        expect(questionnaire.getQuestions().length).equal(0);
    });

    it('getResultat', function() {
        expect(questionnaire.getResultatEtudiant().length).equal(0);
    });
});

describe('Setter', () => {
    questionnaire.initialize(1, "a", true, cours);

    it('setId', function() {
        questionnaire.setId(2)
        expect(questionnaire.getId()).equal(2);
    });

    it('setDesc', function() {
        questionnaire.setDescription("b")
        expect(questionnaire.getDescription()).equal("b");
    });

    it('setEtat', function() {
        questionnaire.setEtat(false)
        expect(questionnaire.getEtat()).equal(false);
    });

    it('setCours', function() {
        let cours2:Cours = new Cours();
        questionnaire.setCours(cours2)
        expect(questionnaire.getCours()).equal(cours2);
    });

    it('setQuestions', function() {
        let cours2:Cours = new Cours();
        questionnaire.setQuestions([null])
        expect(questionnaire.getQuestions().length).equal(1);
    });
});

describe('ContainQuestion', () => {
    questionnaire.initialize(1, "a", true, cours);
    let question:Question = new Question();
    question.initialize(1, "enonce", null, null);
    let question2:Question = new Question();
    question2.initialize(2, "enonce2", null, null);

    it('contien aucune question', function() {
        questionnaire.setQuestions([]);
        expect(questionnaire.containsQuestion(1)).equal(false);
    });

    it('contien la question premier index', function() {
        questionnaire.setQuestions([question, question2]);
        expect(questionnaire.containsQuestion(1)).equal(true);
    });

    it('contien la question dans liste', function() {
        questionnaire.setQuestions([question, question2]);
        expect(questionnaire.containsQuestion(2)).equal(true);
    });

    it('ne contien pas la question dans liste', function() {
        questionnaire.setQuestions([question, question2]);
        expect(questionnaire.containsQuestion(3)).equal(false);
    });
});

describe('AjouterQuestion', () => {
    questionnaire.initialize(1, "a", true, cours);
    let question:Question = new Question();
    question.initialize(1, "enonce", null, null);
    let question2:Question = new Question();
    question2.initialize(2, "enonce2", null, null);

    it('contien aucune question', function() {
        questionnaire.setQuestions([]);
        expect(questionnaire.getQuestions().length).equal(0);
        questionnaire.ajouterQuestion(question);
        expect(questionnaire.getQuestions().length).equal(1);
    });
});

describe('Convert', () => {
    it('convertJsonToObject Null', function() {
        questionnaire.initialize(1, "a", true, cours);
        questionnaire.convertJsonToObject(null, null, null);
        expect(questionnaire.getId()).equal(1);
    });
    it('convertJsonToObject', function() {
        questionnaire.initialize(1, "a", true, cours);
        let object:ObjetDynamique = {};
        object.id_questionnaire = 2;
        object.description = "a";
        object.etat = true;
        object.questions = [];
        object.resultatEtudiants = [];
        object.coursId = 500;

        questionnaire.convertJsonToObject(object, null, null);
        expect(questionnaire.getId()).equal(2);
        expect(questionnaire.getDescription()).equal("a");
        expect(questionnaire.getEtat()).equal(true);
    });
    it('convertJsonToObject Array null', function() {
        questionnaire.initialize(1, "a", true, cours);
        let object:ObjetDynamique = {};
        object.id_questionnaire = 2;
        object.description = "a";
        object.etat = true;
        object.questions = [];
        object.resultatEtudiants = null;
        object.coursId = 500;

        questionnaire.convertJsonToObject(object, null, null);
        expect(questionnaire.getId()).equal(2);
        expect(questionnaire.getDescription()).equal("a");
        expect(questionnaire.getEtat()).equal(true);
    });
});