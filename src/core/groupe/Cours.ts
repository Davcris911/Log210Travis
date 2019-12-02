import { Etudiant } from "./Etudiant";

export class Cours {
    private _id : number;
    private _sigle : string;
    private _nbMaxEtudiants : number;
    private _groupe : string;
    private _titre : string;
    private _dateDebut : string;
    private _dateFin : string;
    private _listeEtudiants : Etudiant[];

    constructor() {
        this._listeEtudiants = [];
    }

    public initialize (id: number, sigle: string, nbMaxEtudiants: number, groupe: string, titre: string, dateDebut: string, dateFin: string){
        this._id = id;
        this._sigle = sigle;
        this._nbMaxEtudiants = nbMaxEtudiants;
        this._groupe = groupe;
        this._titre = titre;
        this._dateDebut = dateDebut;
        this._dateFin = dateFin;
    }

    public actif(){
        return true;
    }

    public getId(): number {
        return this._id;
    }

    public setId(value: number) {
        this._id = value;
    }

    public getSigle(): string {
        return this._sigle;
    }

    public setSigle(value: string) {
        this._sigle = value;
    }

    public getNbMaxEtudiants(): number {
        return this._nbMaxEtudiants;
    }

    public setNbMaxEtudiants(value: number) {
        this._nbMaxEtudiants = value;
    }

    public getGroupe(): string {
        return this._groupe;
    }

    public setGroupe(value: string) {
        this._groupe = value;
    }

    public getTitre(): string {
        return this._titre;
    }

    public setTitre(value: string) {
        this._titre = value;
    }

    public getDateDebut(): string {
        return this._dateDebut;
    }

    public setDateDebut(value: string) {
        this._dateDebut = value;
    }

    public getDateFin(): string {
        return this._dateFin;
    }

    public setDateFin(value: string) {
        this._dateFin = value;
    }

    public  getListeEtudiant(): Etudiant[]{
        return this._listeEtudiants;
    }

    public  setListeEtudiant(value : Etudiant[]){
        this._listeEtudiants = value;
    }

    public ajouterEtudiant(etudiant:Etudiant){
        this._listeEtudiants.push(etudiant);
    }
    public convertJsonToObject(objet){
        if(objet != null){
            this.setId(objet.id);
            this.setSigle(objet.sigle);
            this.setNbMaxEtudiants(objet.nb_max_student);
            this.setGroupe(objet.groupe);
            this.setTitre(objet.titre);
            this.setDateDebut(objet.date_debut);
            this.setDateFin(objet.date_fin);
        }
    }
}