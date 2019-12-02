import * as chai from 'chai';
import {Devoir} from "../../../src/core/devoir/Devoir";
import {Cours} from "../../../src/core/groupe/Cours";
import {Etudiant} from "../../../src/core/groupe/Etudiant";
import {ListeCours} from "../../../src/core/groupe/ListeCours";

const expect = chai.expect;

let devoir:Devoir = new Devoir();
let cours:Cours = new Cours();

interface ObjetDynamique {
    [key: string]: any
}

describe('Getter Setter', () => {
    cours.initialize(1, "Log", 5, "01", "210", "Hier", "Aujourd'hui");
    devoir.initialize(1, 'a', 100, new Date(2020), new Date(2021), true, cours);

    it('getId', function() {
        expect(devoir.getId()).equal(1);
    });
    it('getDescription', function() {
        expect(devoir.getDescription()).equal('a');
    });
    it('getNoteMaximal', function() {
        expect(devoir.getNoteMaximale()).equal(100);
    });
    it('getDateDebut', function() {
        expect(devoir.getDateDebut().getFullYear()).equal(new Date(2020).getFullYear());
    });
    it('getDateFin', function() {
        expect(devoir.getDateFin().getFullYear()).equal(new Date(2021).getFullYear());
    });
    it('getVisivle', function() {
        expect(devoir.getVisible()).equal(true);
    });
    it('getResultatEtudiants', function() {
        expect(devoir.getResultatEtudiant().length).equal(0);
    });
    it('getResultatEtudiants trie1', function() {
        expect(devoir.getResultatEtudiant(1).length).equal(0);
    });
    it('getResultatEtudiants trie2', function() {
        expect(devoir.getResultatEtudiant(2).length).equal(0);
    });
    it('getCours', function() {
        expect(devoir.getCours().getId()).equal(cours.getId());
    });


    it('setId', function() {
        devoir.setId(2);
        expect(devoir.getId()).equal(2);
    });
    it('setDescription', function() {
        devoir.setDescription('q');
        expect(devoir.getDescription()).equal('q');
    });
    it('setNoteMaximale', function() {
        devoir.setNoteMaximale(85)
        expect(devoir.getNoteMaximale()).equal(85);
    });
    it('setDateDebut', function() {
        devoir.setDateDebut(new Date(2019));
        expect(devoir.getDateDebut().getFullYear()).equal(new Date(2019).getFullYear());
    });
    it('setDateFin', function() {
        devoir.setDateFin(new Date(2022))
        expect(devoir.getDateFin().getFullYear()).equal(new Date(2022).getFullYear());
    });
    it('setVisible', function() {
        devoir.setVisible(false);
        expect(devoir.getVisible()).equal(false);
    });
    it('setResultatEtudiant', function() {
        devoir.setResultatEtudiant([]);
        expect(devoir.getResultatEtudiant().length).equal(0);
    });
    it('setCours', function() {
        devoir.setCours(null);
        expect(devoir.getCours()).equal(null);
    });
});

describe('ConvertJsonToObject', () => {

    it('convertJsonToObject Null', function() {
        devoir.initialize(1, 'a', 100, new Date(2020), new Date(2021), true, cours);
        devoir.convertJsonToObject(null, null);
        expect(devoir.getId()).equal(1);
    });

    it('convertJsonToObject', function() {
        devoir.initialize(1, 'a', 100, new Date(2020), new Date(2021), true, cours);

        let listeCours= new ListeCours();
        let e1:Etudiant = new Etudiant();
        e1.initialize(1, "benjamin", "asd", "b@b", "1234");
        let cours2:Cours = new Cours();
        cours2.initialize(2, "Log", 5, "01", "210", "Hier", "Aujourd'hui");

        listeCours.setListeEtudiants([e1]);
        listeCours.setListeCours([cours, cours2]);

        let object:ObjetDynamique = {};
        object.id_devoir = 2;
        object.description = "q";
        object.note_maximale = 80;
        object.date_debut = "2000-01-01";
        object.date_fin = "2022-02-02";
        object.visible = false;
        object.id_cours = 2;

        let resultat:ObjetDynamique = {};
        resultat.id = 1;
        resultat.resultat = 80;
        object.resultatEtudiants = [resultat]

        devoir.convertJsonToObject(object, listeCours);

        expect(devoir.getId()).equal(2);
        expect(devoir.getDescription()).equal('q');
        expect(devoir.getNoteMaximale()).equal(80);
        expect(devoir.getVisible()).equal(false);
        expect(devoir.getDateDebut().getDay()).equal(new Date(2000, 1, 1).getDay());
        expect(devoir.getDateFin().getDay()).equal(new Date(2022, 2, 2).getDay());
        expect(devoir.getCours().getSigle()).equal('Log');
        expect(devoir.getResultatEtudiant().length).equal(1);
    });
});