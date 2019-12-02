import * as chai from 'chai';
import {Etudiant} from "../../../src/core/groupe/Etudiant";
import {Cours} from "../../../src/core/groupe/Cours";
import {Enseignant} from "../../../src/core/groupe/Enseignant";

const expect = chai.expect;

let cours:Cours = new Cours();

interface ObjetDynamique {
    [key: string]: any
}

describe('Getter Setter', () => {
    cours.initialize(1, "Log", 5, "01", "210", "Hier", "Aujourd'hui");

    it('actif', function() {
        expect(cours.actif()).equal(true);
    });
    it('getId', function() {
        expect(cours.getId()).equal(1);
    });
    it('getSigle', function() {
        expect(cours.getSigle()).equal("Log");
    });
    it('getNbMaxEtudiants', function() {
        expect(cours.getNbMaxEtudiants()).equal(5);
    });
    it('getGroupe', function() {
        expect(cours.getGroupe()).equal("01");
    });
    it('getTitre', function() {
        expect(cours.getTitre()).equal("210");
    });
    it('getDateDebut', function() {
        expect(cours.getDateDebut()).equal("Hier");
    });
    it('getDateFin', function() {
        expect(cours.getDateFin()).equal("Aujourd'hui");
    });
    it('getListeEtudiant', function() {
        expect(cours.getListeEtudiant().length).equal(0);
    });

    it('setId', function() {
        cours.setId(2)
        expect(cours.getId()).equal(2);
    });
    it('setSigle', function() {
        cours.setSigle("test")
        expect(cours.getSigle()).equal("test");
    });
    it('setNbMaxEtudiants', function() {
        cours.setNbMaxEtudiants(2)
        expect(cours.getNbMaxEtudiants()).equal(2);
    });
    it('setGroupe', function() {
        cours.setGroupe("test")
        expect(cours.getGroupe()).equal("test");
    });
    it('setTitre', function() {
        cours.setTitre("test")
        expect(cours.getTitre()).equal("test");
    });
    it('setDateDebut', function() {
        cours.setDateDebut("test")
        expect(cours.getDateDebut()).equal("test");
    });
    it('setDateFin', function() {
        cours.setDateFin("test")
        expect(cours.getDateFin()).equal("test");
    });
    it('setListeEtudiant', function() {
        let e:Etudiant = new Etudiant();
        cours.setListeEtudiant([e]);
        expect(cours.getListeEtudiant().length).equal(1);
    });

});

describe('Méthodes', () => {

    it('setListeEtudiant', function() {
        cours.initialize(1, "Log", 5, "01", "210", "Hier", "Aujourd'hui");
        let e:Etudiant = new Etudiant();
        cours.setListeEtudiant([]);
        cours.ajouterEtudiant(e);
        expect(cours.getListeEtudiant().length).equal(1);
    });

    it('convertJsonToObject Null', function() {
        cours.initialize(1, "Log", 5, "01", "210", "Hier", "Aujourd'hui");
        cours.convertJsonToObject(null);
        expect(cours.getSigle()).equal("Log");
    });
    it('convertJsonToObject', function() {
        cours.initialize(1, "Log", 5, "01", "210", "Hier", "Aujourd'hui");
        let object:ObjetDynamique = {};
        object.id = 2;
        object.sigle = "a";
        object.nb_max_student = 1;
        object.groupe = "a";
        object.titre = "a";
        object.date_debut = "a";
        object.date_fin = "a";
        cours.convertJsonToObject(object);

        expect(cours.getId()).equal(2);
        expect(cours.getNbMaxEtudiants()).equal(1);
        expect(cours.getSigle()).equal("a");
        expect(cours.getGroupe()).equal("a");
        expect(cours.getTitre()).equal("a");
        expect(cours.getDateDebut()).equal("a");
        expect(cours.getDateFin()).equal("a");
    });
});