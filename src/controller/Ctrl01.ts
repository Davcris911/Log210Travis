import {RouteCommune} from "../routes/RouteCommune";
import {ListeCours} from "../core/groupe/ListeCours";

export class Ctrl01 {

    listeCours : ListeCours;
    listeCoursSgb : ListeCours;

    constructor() {
        this.listeCours = RouteCommune.getInstance().getListeCours();
    }

    public getListeCours(){
        return this.listeCours;
    }
    public getListeSGB(){
        return this.listeCoursSgb;
    }
    public getListeSigleCours() {
        return this.listeCours.getListeSigleCours();
    }

    public demarrer(){
        let db = RouteCommune.getInstance()
        this.init();
        if(this.listeCoursSgb == null){
            this.listeCoursSgb = db.getAllCoursSGB();
        }
    }

    public init(){
        RouteCommune.getInstance().initialiserListeCours();
    }

    public ajouterCours(idCours:number){
        this.listeCours.ajouterCours(this.listeCoursSgb.afficherCours(idCours));
    }

    public afficherCours(id:number){
        return this.listeCours.afficherCours(id);
    }

    public supprimerCours(id:number){
        RouteCommune.getInstance().supprimerCours(id);
    }
}