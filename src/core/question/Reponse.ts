export class Reponse {
    private _id: number;
    private _numeroReponse: number;
    private _listeTexteReponse: string[];
    
    constructor(id?: number) {
        this._id = id || -1;
        this._listeTexteReponse = [];
    }

    public ajouterMauvaiseReponse(texteReponse : string){
        this._listeTexteReponse.push(texteReponse);
    }

    public ajouterBonneReponse(texteReponse : string){
        if((this._numeroReponse != null)){
            this._listeTexteReponse.splice(this._numeroReponse,1);
            this._numeroReponse = null;
        }
        this._numeroReponse = this._listeTexteReponse.push(texteReponse) -1;
    }

    public getBonneReponse(): string{
        if((this._numeroReponse != null)){
            return this._listeTexteReponse[this._numeroReponse];
        }
        return undefined
    }

    public getId(): number {
        return this._id;
    }

    public getNumeroReponse(): number {
        return this._numeroReponse;
    }

    public getListeTexteReponse(): string[] {
        return this._listeTexteReponse;
    }

    public setId(value: number) {
        this._id = value;
    }

    public setNumeroReponse(value: number) {
        this._numeroReponse = value;
    }

    public setListeTexteReponse(value: string[]) {
        this._listeTexteReponse = value;
    }

    public convertJsonToObject(objet) {
        if(objet != null){
            this.setId(objet.id_reponse);
            this.setNumeroReponse(objet.numero_reponse);
            this.setListeTexteReponse(objet.explication_reponse);
        }
    }
}