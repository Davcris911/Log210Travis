import * as chai from 'chai';

import {Cours} from "../../../src/core/groupe/Cours";
import {ListeCours} from "../../../src/core/groupe/ListeCours";
import {Etudiant} from "../../../src/core/groupe/Etudiant";

const expect = chai.expect;

let listeCours:ListeCours;

describe('Getter Setter', () => {

    it('getListeCours', function() {
        listeCours= new ListeCours();
        expect(listeCours.getListeCours().length).equal(0);
    });
    it('getListeEtudiants', function() {
        listeCours= new ListeCours();
        expect(listeCours.getListeEtudiants().length).equal(0);
    });
    it('getListeSigleCours', function() {
        listeCours= new ListeCours();
        let cours2:Cours = new Cours();
        cours2.initialize(2, "Log2", 5, "02", "212", "Hier", "Aujourd'hui");
        listeCours.setListeCours([cours2]);
        expect(listeCours.getListeSigleCours()).equal("2");
    });

});

describe('Setter', () => {
    listeCours= new ListeCours();
    let cours:Cours = new Cours();
    cours.initialize(1, "Log", 5, "01", "210", "Hier", "Aujourd'hui");
    let e:Etudiant = new Etudiant();

    it('setListeCours', function() {
        listeCours.setListeCours([cours]);
        expect(listeCours.getListeCours().length).equal(1);
    });
    it('setListeEtudiants', function() {
        listeCours.setListeEtudiants([e]);
        expect(listeCours.getListeEtudiants().length).equal(1);
    });
});

describe('Méthodes', () => {
    listeCours= new ListeCours();
    let cours:Cours = new Cours();
    cours.initialize(1, "Log", 5, "01", "210", "Hier", "Aujourd'hui");
    let cours2:Cours = new Cours();
    cours2.initialize(2, "Log2", 5, "02", "212", "Hier", "Aujourd'hui");
    let cours3:Cours = new Cours();

    let e1:Etudiant = new Etudiant();
    e1.initialize(1, "benjamin", "asd", "b@b", "1234");
    let e2:Etudiant = new Etudiant();
    e2.initialize(2, "david", "asdf", "d@d", "1235");
    listeCours.setListeEtudiants([e1, e2]);

    it('afficherCours', function() {
        listeCours= new ListeCours();
        let cours:Cours = new Cours();
        cours.initialize(1, "Log", 5, "01", "210", "Hier", "Aujourd'hui");
        let cours2:Cours = new Cours();
        cours2.initialize(2, "Log2", 5, "02", "212", "Hier", "Aujourd'hui");
        listeCours.setListeCours([cours, cours2]);
        expect(listeCours.afficherCours(2).getSigle()).equal("Log2");
    });

    it('afficherEtudiant', function() {
        listeCours= new ListeCours();
        let e1:Etudiant = new Etudiant();
        e1.initialize(1, "benjamin", "asd", "b@b", "1234");
        let e2:Etudiant = new Etudiant();
        e2.initialize(2, "david", "asdf", "d@d", "1235");
        listeCours.setListeEtudiants([e1, e2]);
        expect(listeCours.afficherEtudiant(2).getPrenom()).equal("david");
    });

    it('ajouter', function() {
        listeCours= new ListeCours();
        let cours:Cours = new Cours();
        cours.initialize(1, "Log", 5, "01", "210", "Hier", "Aujourd'hui");
        let cours2:Cours = new Cours();
        cours2.initialize(2, "Log2", 5, "02", "212", "Hier", "Aujourd'hui");
        listeCours.setListeCours([cours2]);
        listeCours.ajouterCours(cours);

        let etudiant:Etudiant = new Etudiant();
        etudiant.initialize(1, "a", "b", "a@a", "aaa");
        listeCours.setListeEtudiants([etudiant]);

        expect(listeCours.getListeCours().length).equal(2);
    });

    it('supprimer', function() {
        listeCours= new ListeCours();
        let cours:Cours = new Cours();
        cours.initialize(1, "Log", 5, "01", "210", "Hier", "Aujourd'hui");
        let cours2:Cours = new Cours();
        cours2.initialize(2, "Log2", 5, "02", "212", "Hier", "Aujourd'hui");
        listeCours.setListeCours([cours, cours2]);
        expect(listeCours.supprimer(2).length).equal(1);
    });

    it('jsonToFile', function() {
        listeCours.setListeCours([]);
        listeCours.setListeEtudiants([]);
        expect(listeCours.getListeCours().length).equal(0);
        expect(listeCours.getListeEtudiants().length).equal(0);
        let jsonEtudiant = require("./students.json");
        listeCours.jsonToFile(jsonEtudiant);
        expect(listeCours.getListeCours().length).equal(4);
        expect(listeCours.getListeEtudiants().length).equal(2);
    });

});