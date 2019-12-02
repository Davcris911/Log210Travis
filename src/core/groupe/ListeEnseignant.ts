import {Enseignant} from "./Enseignant";

export class ListeEnseignant{

    private listeEnseignant : Enseignant[];

    constructor(){
        this.listeEnseignant = [];
    }

    public getListeEnseignant(): Enseignant[] {
        return this.listeEnseignant;
    }
    public setListeEnseignant(value:Enseignant[]) {
        this.listeEnseignant = value;
    }

    public jsonToFile(jsonEnseignant){
        if(jsonEnseignant == null){
            console.log("Ne pas oublier le serveur SGB");
            jsonEnseignant = require('../../data/sgb/teachers.json');
        }

        this.convertJsonEnseignant(jsonEnseignant);
    }

    public afficherEnseignant(id : number): Enseignant{
        let position:number;
        let i:number = 0;
        for(let enseignant of this.listeEnseignant){
            if(id == enseignant.getId()){
                return enseignant;
            }
        }
        return undefined;
    }

    public supprimerEnseignant(is : number): Enseignant[]{
        return this.listeEnseignant.splice(is-1,1);
    }

    private convertJsonEnseignant(json){
        for(let enseignantJson of json){
            let enseignant = new Enseignant(null, null, null, null);
            enseignant.convertJsonToObject(enseignantJson);
            this.listeEnseignant.push(enseignant);
        }
    }
}