import {RouteCommune} from "../routes/RouteCommune";
import {ListeCours} from "../core/groupe/ListeCours";
import {ListeQuestions} from "../core/question/ListeQuestions";

export class Ctrl02 {

    listeQuestions: ListeQuestions;

    constructor() {
        this.listeQuestions = RouteCommune.getInstance().getListeQuestions();
    }

    public getQuestions(){
        return this.listeQuestions;
    }

    public getQuestion(id:number){
        return this.listeQuestions.getQuestion(id);
    }

    public supprimerQuestion(id:number){
        this.listeQuestions.supprimerQuestion(id);
    }
}