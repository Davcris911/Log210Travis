import { Reponse } from "./Reponse";
import { Enseignant } from "../groupe/Enseignant";

export class Question {
    private _id: number;
    private _enonce: string;
    private _choixReponse : string[];
    private _reponse: Reponse;

    private _enseignant : Enseignant;

    constructor() {
        this._choixReponse = [];
    }

    public initialize (id: number, enonce: string, reponse: Reponse, enseignant : Enseignant){
        this._id = id;
        this._enonce = enonce;
        this._reponse = reponse;
        this._enseignant = enseignant;
        this._choixReponse = [];
    }

    public getId(): number {
        return this._id;
    }

    public setId(value: number) {
        this._id = value;
    }

    public getEnonce(): string {
        return this._enonce;
    }

    public setEnonce(value: string) {
        this._enonce = value;
    }

    public getReponse(): Reponse {
        return this._reponse;
    }
    public setReponse(value: Reponse) {
        this._reponse = value;
    }

    public getChoixReponse() : string[] {
        return this._choixReponse;
    }

    public setChoixReponse(value:string[]) {
        this._choixReponse = value;
    }

    public ajouterChoixReponse(texte : string){
        this._choixReponse.push(texte);
    }

    public convertJsonToObject(objet){
        if(objet != null){
            this.setId(objet.id_question);
            this.setEnonce(objet.enonce);
            this.setChoixReponse(objet.choix_reponse);
        }
    }
}