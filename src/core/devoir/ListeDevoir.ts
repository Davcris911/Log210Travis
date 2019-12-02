import { Devoir } from "./Devoir";
import {Questionnaire} from "../questionnaire/Questionnaire";
import {ListeCours} from "../groupe/ListeCours";
import {ListeQuestions} from "../question/ListeQuestions";
import {Cours} from "../groupe/Cours";

export class ListeDevoir{

    private listeDevoir : Devoir[];

    constructor(){
        this.listeDevoir = [];
    }

    public init(listeCours:ListeCours){
        var json = require('../../data/devoirs.json');
        for(let devoirJson of json){
            let devoir:Devoir = new Devoir();
            devoir.convertJsonToObject(devoirJson, listeCours);
            this.listeDevoir.push(devoir);
        }
    }

    public getListeDevoir(): Devoir[] {
        return this.listeDevoir;
    }

    public setListeDevoir(value:Devoir[]) {
        this.listeDevoir = value;
    }

    public getListeDevoirParCours(idCours : number): Devoir[]{
        let listeReturn : Devoir[] = [];
        for(let devoir of this.listeDevoir){
            let cours = devoir.getCours();
            if(cours != undefined && idCours == cours.getId()){
                listeReturn.push(devoir);
            }
        }
        return listeReturn;
    }

    public getDevoir(idDevoir : number): Devoir {
        for (let devoir of this.listeDevoir) {
            if (idDevoir == devoir.getId()) {
                return devoir;
            }
        }
        return undefined;
    }

    public modifierDevoir(idDevoir : number, visible : boolean, description : string,dateDebut : Date,dateFin : Date, noteMax : number)
    {
        this.getDevoir(idDevoir).modifierDevoir(visible,description,dateDebut,dateFin,noteMax);
    }

    public getNombreDevoirParCours(listeCours : ListeCours) : Map<number, number>{
        let map = new Map();
        for(let cours of listeCours.getListeCours()){
            let id = cours.getId();
            let ocurence = 0;
            for(let devoir of this.getListeDevoir()){
                if(devoir.getCours().getId() == id){
                    ocurence++;
                }
            }
            map.set(id,ocurence);
        }
        return map
    }

    public creerDevoir(description: string, noteMaximale: number, dateDebut: Date, dateFin: Date, visible: number, cours:Cours): Devoir {
        let devoir:Devoir = new Devoir();
        devoir.setId(this.listeDevoir.length + 1);
        devoir.setDescription(description);
        devoir.setNoteMaximale(noteMaximale);
        devoir.setDateDebut(dateDebut);
        devoir.setDateFin(dateFin);
        if(visible == 0){
            devoir.setVisible(true);
        } else{
            devoir.setVisible(false);
        }
        devoir.setCours(cours);
        this.listeDevoir.push(devoir);
        return devoir;
    }

    public supprimerDevoir(is : number): Devoir[]{
        return this.getListeDevoir().splice(is-1,1);
    }
}