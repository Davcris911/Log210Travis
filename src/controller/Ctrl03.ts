import {RouteCommune} from "../routes/RouteCommune";
import {ListeCours} from "../core/groupe/ListeCours";
import {ListeDevoir} from "../core/devoir/ListeDevoir";

export class Ctrl03 {
    listeCours : ListeCours;
    listeDevoir : ListeDevoir;

    constructor() {
        let instance = RouteCommune.getInstance();
        this.listeCours = instance.getListeCours();
        this.listeDevoir = instance.getListeDevoir();
        this.init();
    }

    public getListeCours(){
        return this.listeCours;
    }
    public getListeDevoir(){
        return this.listeDevoir;
    }

    public getNbDevoirParCours(){
        return this.listeDevoir.getNombreDevoirParCours(this.listeCours);
    }

    public getDevoirParCours(id:number){
        return this.listeDevoir.getListeDevoirParCours(id);
    }

    public getDevoir(id:number){
        return this.listeDevoir.getDevoir(id);
    }

    public init(){
        RouteCommune.getInstance().initListeDevoir();
    }

}