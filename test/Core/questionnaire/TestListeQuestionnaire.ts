import * as chai from 'chai';

import {Questionnaire} from "../../../src/core/questionnaire/Questionnaire";
import {Cours} from "../../../src/core/groupe/Cours";
import {Question} from "../../../src/core/question/Question";
import {ListeQuestionnaire} from "../../../src/core/questionnaire/ListeQuestionnaire";
import {ListeQuestions} from "../../../src/core/question/ListeQuestions";
import {ListeCours} from "../../../src/core/groupe/ListeCours";

const expect = chai.expect;

let liste:ListeQuestionnaire = new ListeQuestionnaire();

let listeCours:ListeCours = new ListeCours();
let cours:Cours = new Cours();
cours.initialize(1, "a", 0, "a", "a", "a", "a");
listeCours.getListeCours().push(cours);

let listeQuestions:ListeQuestions = new ListeQuestions();
let question:Question = new Question();
question.initialize(1, "a", null, null);

liste.init(listeCours, listeQuestions);

describe('initialize and GetterSetter', () => {
    liste.init(listeCours, listeQuestions);

    it('getListe', function() {
        expect(liste.getListeQuestionnaire().length).equal(1);
    });

    it('setListe', function() {
        let listeQ = liste.getListeQuestionnaire();
        liste.setListeQuestionnaire([]);
        expect(liste.getListeQuestionnaire().length).equal(0);
        liste.setListeQuestionnaire(listeQ);
        expect(liste.getListeQuestionnaire().length).equal(1);
    });

    it('getListeParCours Mauvais Cours', function() {
        expect(liste.getListeParCours(2).length).equal(0);
    });

    it('getListeParCours Bon Cours', function() {
        expect(liste.getListeParCours(1).length).equal(1);
    });

    it('getQuestionnaire Mauvaise Question', function() {
        expect(liste.getQuestionnaire(0)).equal(undefined);
    });

    it('getQuestionnaire Bonne Question', function() {
        expect(liste.getQuestionnaire(1).getDescription()).equal("Questionnaire 1");
    });

    it('getNombreQuestionsParQuestionnaire', function() {
        expect(liste.getNombreQuestionsParQuestionnaire(listeQuestions).get(1)).equal(1);
    });
});

describe('methode Creer Questionnaire', () => {
    it('creerQuestionnaire Actif', function () {
        liste.creerQuestionnaire("b", 0, cours);
        let i = liste.getListeQuestionnaire().length - 1;
        expect(liste.getListeQuestionnaire()[i].getEtat()).equal(true);
    });
    it('creerQuestionnaire Inactif', function () {
        liste.creerQuestionnaire("c", 1, cours);
        let i = liste.getListeQuestionnaire().length - 1;
        expect(liste.getListeQuestionnaire()[i].getEtat()).equal(false);
    });
});

describe('methode ajouterQuestions Questionnaire', () => {
    liste.getQuestionnaire(1).setQuestions([question]);

    it('ajouterQuestions aucune Question', function() {
        liste.ajouterQuestions(1, [], listeQuestions);
        expect(liste.getQuestionnaire(1).getQuestions().length).equal(1);
    });
    it('ajouterQuestions Question déja contenu', function() {
        liste.ajouterQuestions(1, [1], listeQuestions);
        expect(liste.getQuestionnaire(1).getQuestions().length).equal(1);
    });
    it('ajouterQuestions Nouvelle Question', function() {
        let question2:Question = new Question();
        question2.initialize(2, "a", null, null);
        listeQuestions.getListeQuestion().push(question2)
        liste.ajouterQuestions(1, [2], listeQuestions);
        expect(liste.getQuestionnaire(1).getQuestions().length).equal(2);
    });
});

describe('methode supprimer Questionnaire', () => {
    let listeCours2:ListeCours = new ListeCours();
    let cours2:Cours = new Cours();
    cours2.initialize(1, "a", 0, "a", "a", "a", "a");
    listeCours2.getListeCours().push(cours2);

    let listeQuestions2:ListeQuestions = new ListeQuestions();
    let question2:Question = new Question();
    question2.initialize(1, "a", null, null);
    listeQuestions2.setListeQuestion([question2]);

    liste.init(listeCours2, listeQuestions2);

    it('suprimerQuestionnaire', function() {
        expect(liste.getListeQuestionnaire().length).equal(3);
        liste.supprimerQuestionnaire(1);
        expect(liste.getListeQuestionnaire().length).equal(2);
    });
});

describe('methode update Questionnaire', () => {
    let listeCours2:ListeCours = new ListeCours();
    let cours2:Cours = new Cours();
    cours2.initialize(1, "a", 0, "a", "a", "a", "a");
    listeCours2.getListeCours().push(cours2);

    let listeQuestions2:ListeQuestions = new ListeQuestions();
    let question2:Question = new Question();
    question2.initialize(1, "a", null, null);
    listeQuestions2.setListeQuestion([question2]);

    liste.init(listeCours2, listeQuestions2);

    it('updateQuestionnaire etat 0', function() {
        liste.updateQuestionnaire(1, 'a', 0, listeQuestions2, listeQuestions2);
        expect(liste.getQuestionnaire(1).getDescription()).equal('a');
    });
    it('updateQuestionnaire etat 1', function() {
        liste.updateQuestionnaire(1, 'a', 1, listeQuestions2, listeQuestions2);
        expect(liste.getQuestionnaire(1).getDescription()).equal('a');
    });
});