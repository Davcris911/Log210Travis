import {Cours} from "../groupe/Cours";
import {ListeCours} from "../groupe/ListeCours";

export class Devoir {
    private _id : number;
    private _description : string;
    private _noteMaximale : number;
    private _dateDebut : Date;
    private _dateFin : Date;
    private _visible : boolean;
    private _resultatEtudiant: any[];
    private _cours : Cours;


    constructor() {
        this._visible = true;
        this._resultatEtudiant = [];
    }

    public initialize (id: number, description: string, noteMaximale: number, dateDebut: Date, dateFin: Date, visible: boolean, cours:Cours){
        this._id = id;
        this._description = description;
        this._noteMaximale = noteMaximale;
        this._dateDebut = dateDebut;
        this._dateFin = dateFin;
        this._visible = visible;
        this._cours = cours;
    }

    public modifierDevoir(visible : boolean, description : string,dateDebut : Date,dateFin : Date, noteMax : number)
    {
        this._visible=visible;
        this._description =description;
        dateDebut.setDate(dateDebut.getDate());
        this._dateDebut=dateDebut;
        dateFin.setDate(dateFin.getDate());
        this._dateFin=dateFin;
        this._noteMaximale=noteMax;
    }

    public getId(): number {
        return this._id;
    }
    public setId(value: number) {
        this._id = value;
    }

    public getDescription(): string {
        return this._description;
    }
    public setDescription(value: string) {
        this._description = value;
    }

    public getNoteMaximale(): number {
        return this._noteMaximale;
    }
    public setNoteMaximale(value: number) {
        this._noteMaximale = value;
    }

    public getDateDebut(): Date {
        return this._dateDebut;
    }
    public setDateDebut(value: Date) {
        this._dateDebut = value;
    }

    public getDateFin(): Date {
        return this._dateFin;
    }
    public setDateFin(value: Date) {
        this._dateFin = value;
    }

    public getVisible(): boolean {
        return this._visible;
    }
    public setVisible(value: boolean) {
        this._visible = value;
    }

    public getResultatEtudiant(trie?:number): any[] {
        if(trie != null){
            return this.trierResultat(trie);
        }
        return this._resultatEtudiant;
    }
    public setResultatEtudiant(value: any[]) {
        this._resultatEtudiant = value;
    }

    public getCours(): Cours {
        return this._cours;
    }
    public setCours(value: Cours) {
        this._cours = value;
    }

    public convertJsonToObject(objet, listeCours: ListeCours) {
        if(objet != null){
            this.setId(objet.id_devoir);
            this.setDescription(objet.description);
            this.setNoteMaximale(objet.note_maximale);
            this.setDateDebut(this.convertDate(objet.date_debut));
            this.setDateFin(this.convertDate(objet.date_fin));
            this.setVisible(objet.visible);
            this.setResultatEtudiant(this.initResultatEtudiant(objet.resultatEtudiants, listeCours));
            this.setCours(listeCours.afficherCours(objet.id_cours));
        }
    }

    private convertDate(dateString: string) : Date{
        let arrayDate = dateString.split('-');
        let annee:number = Number(arrayDate[0]);
        let mois:number = Number(arrayDate[1]);
        let jour:number = Number(arrayDate[2]);
        let date:Date = new Date(annee, mois, jour);
        return date;
    }
    private initResultatEtudiant(arrayEtudiantResultat, listeCours:ListeCours) {
        let arrayResultat = [];
        if(arrayEtudiantResultat != null) {
            for (let etudiantResultat of arrayEtudiantResultat) {
                arrayResultat.push([listeCours.afficherEtudiant(etudiantResultat.id), etudiantResultat.resultat]);
            }
        }
        return arrayResultat;
    }

    private trierResultat(trie: number) : any[]{
        if(trie == null){
            trie = 0;
        }

        if(trie == 1){
            let test = this._resultatEtudiant.sort(function(a,b){
                return a[0].getNomFamille() - b[0].getNomFamille();
            });
            return test;
        } else if(trie == 2) {
            return this._resultatEtudiant.sort(function(a,b){
                return a[1] - b[1];
            });
        }
        return this._resultatEtudiant;
    }
}