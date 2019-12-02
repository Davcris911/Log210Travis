import * as chai from 'chai';
import {ListeDevoir} from "../../../src/core/devoir/ListeDevoir";
import {ListeCours} from "../../../src/core/groupe/ListeCours";
import {Devoir} from "../../../src/core/devoir/Devoir";
import {Cours} from "../../../src/core/groupe/Cours";

const expect = chai.expect;

let liste:ListeDevoir = new ListeDevoir();
let listeCours:ListeCours = new ListeCours();

let devoir:Devoir = new Devoir();
let devoir2:Devoir = new Devoir();
let devoir3:Devoir = new Devoir();
let devoir4:Devoir = new Devoir();
let devoir5:Devoir = new Devoir();
let cours:Cours = new Cours();
let cours2:Cours = new Cours();

describe('Getter Setter', () => {
    liste.init(listeCours);
    listeCours.setListeCours([cours, cours2]);
    cours.initialize(1, "Log", 5, "01", "210", "Hier", "Aujourd'hui");
    cours2.initialize(2, "Log", 5, "01", "210", "Hier", "Aujourd'hui");
    devoir.initialize(1, 'a', 100, new Date(2020), new Date(2021), true, cours);
    devoir2.initialize(2, 'b', 100, new Date(2020), new Date(2021), true, cours);
    devoir3.initialize(3, 'c', 100, new Date(2020), new Date(2021), true, cours);
    devoir4.initialize(4, 'c', 100, new Date(2020), new Date(2021), true, cours2);
    devoir5.initialize(5, 'c', 100, new Date(2020), new Date(2021), true, undefined);

    it('setListe', function() {
        liste.setListeDevoir([]);
        expect(liste.getListeDevoir().length).equal(0);
    });

    it('getListeParCours', function() {
        liste.setListeDevoir([devoir,devoir2, devoir3]);
        expect(liste.getListeDevoirParCours(1).length).equal(3);
    });

    it('getDevoir', function() {
        liste.setListeDevoir([devoir,devoir2, devoir3, devoir4, devoir5]);
        expect(liste.getDevoir(2).getDescription()).equal('b');
    });
    it('getDevoir Null', function() {
        liste.setListeDevoir([devoir,devoir2, devoir3, devoir4, devoir5]);
        expect(liste.getDevoir(50)).equal(undefined);
    });

    it('getNombreDevoir', function() {
        liste.setListeDevoir([devoir,devoir2, devoir3]);
        expect(liste.getNombreDevoirParCours(listeCours).get(1)).equal(3);
    });
});