export class Etudiant {
    private _id : number;
    private _prenom : string;
    private _nomFamille : string;
    private _email : string;
    private _codePermanent : string;

    constructor() {}

    public initialize (id: number, prenom: string, nomFamille: string, email: string, codePermanent: string){
        this._id = id;
        this._prenom = prenom;
        this._nomFamille = nomFamille;
        this._email = email;
        this._codePermanent = codePermanent;
    }

    public getId(): number {
        return this._id;
    }

    public setId(value: number) {
        this._id = value;
    }

    public getPrenom(): string {
        return this._prenom;
    }

    public setPrenom(value: string) {
        this._prenom = value;
    }

    public getNomFamille(): string {
        return this._nomFamille;
    }

    public setNomFamille(value: string) {
        this._nomFamille = value;
    }

    public getEmail(): string {
        return this._email;
    }

    public setEmail(value: string) {
        this._email = value;
    }

    public getCodePermanent(): string {
        return this._codePermanent;
    }

    public setCodePermanent(value: string) {
        this._codePermanent = value;
    }

    public convertJsonToObject(objet){
        if(objet != null){
            this.setId(objet.id);
            this.setCodePermanent(objet.permanent_code);
            this.setEmail(objet.email);
            this.setPrenom(objet.first_name);
            this.setNomFamille(objet.last_name);
        }
    }
}