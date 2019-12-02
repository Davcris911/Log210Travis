import { Cours } from "./Cours";
import { Etudiant } from "./Etudiant";

export class ListeCours{

    private static jsonInscription:any = require('../../data/link/inscriptionEtudiantCours.json');

    private listeCours : Cours[];
    private listeEtudiants : Etudiant[];

    constructor(){
        this.listeCours = [];
        this.listeEtudiants = [];
    }

    public getListeCours(): Cours[] {
        return this.listeCours;
    }
    public getListeEtudiants(): Etudiant[] {
        return this.listeEtudiants;
    }
    public getListeSigleCours(): String {
        let tmp:String = "";
        for(let cours of this.listeCours){
            tmp += (cours.getId()+",");
        }
        tmp = tmp.substring(0,tmp.length-1);
        return tmp;
    }

    public setListeCours(value:Cours[]) {
        this.listeCours = value;
    }
    public setListeEtudiants(value:Etudiant[]) {
        this.listeEtudiants = value;
    }

    public jsonToFile(jsonEtudiants){
        if(jsonEtudiants == null){
            console.log("Ne pas oublier le serveur SGB");
            jsonEtudiants = require('../../data/sgb/students.json');
        }

        let jsonCours = require('../../data/cours.json');
        this.convertJsonEtudiant(jsonEtudiants);
        this.convertJsonCours(jsonCours);
        this.associerEtudiantCours();
    }

    public ajouterCours(cours: Cours) {
        this.listeCours.push(cours);
        this.associerEtudiantCourSpecifique(cours);
    }

    public afficherCours(id : number): Cours{
        let position:number;
        let i:number = 0;
        for(let cours of this.listeCours){
            if(id == cours.getId()){
                position = i;
            }
            i++;
        }
        if(position != null){
            return this.listeCours[position];
        }
    }

    public afficherEtudiant(id : number): Etudiant{
        let position:number;
        let i:number = 0;
        for(let etudiant of this.listeEtudiants){
            if(id == etudiant.getId()){
                position = i;
            }
            i++;
        }
        if(position != null){
            return this.listeEtudiants[position];
        }
    }

    public supprimer(is : number): Cours[]{
        return this.listeCours.splice(is-1,1);
    }

    public convertJsonCours(json){
        for(let coursJson of json){
            let cours = new Cours();
            cours.convertJsonToObject(coursJson);
            this.listeCours.push(cours);
        }
    }

    private convertJsonEtudiant(json){
        for(let etudiantJson of json){
            let etudiant:Etudiant = new Etudiant();
            etudiant.convertJsonToObject(etudiantJson);
            this.listeEtudiants.push(etudiant);
        }
    }

    private associerEtudiantCours() {
        for(let lien of ListeCours.jsonInscription){
            let cours:Cours = this.afficherCours(lien.id_groupe);
            if(cours != null) {
                for (let idEtudiant of lien.etudiant_inscrit) {
                    let etudiant: Etudiant = this.afficherEtudiant(idEtudiant);
                    if (etudiant != null) {
                        cours.ajouterEtudiant(etudiant);
                    }
                }
            }
        }
    }

    private associerEtudiantCourSpecifique(cours:Cours) {
        if(cours != null){
            for(let lien of ListeCours.jsonInscription){
                if(lien.id_groupe == cours.getId()){
                    for (let idEtudiant of lien.etudiant_inscrit) {
                        let etudiant: Etudiant = this.afficherEtudiant(idEtudiant);
                        if (etudiant != null) {
                            cours.ajouterEtudiant(etudiant);
                        }
                    }
                }
            }
        }
    }

}