import {RouteCommune} from "../routes/RouteCommune";
import {ListeCours} from "../core/groupe/ListeCours";
import {ListeQuestions} from "../core/question/ListeQuestions";
import {ListeQuestionnaire} from "../core/questionnaire/ListeQuestionnaire";

export class Ctrl05 {

    listeCours : ListeCours;
    listeQuestions : ListeQuestions;
    listeQuestionnaire : ListeQuestionnaire;

    constructor() {
        let instance = RouteCommune.getInstance();
        this.listeCours = instance.getListeCours();
        this.listeQuestions = instance.getListeQuestions();
        this.listeQuestionnaire = instance.getListeQuestionnaire();
    }

    public getListeCours(){
        return this.listeCours;
    }

    public getListeQuestions(){
        return this.listeQuestions;
    }

    public getListeQuestionnaire(){
        return this.listeQuestionnaire;
    }

    public getQuestionnaireParCours(){
        return this.listeQuestionnaire.getNombreQuestionnaireParCours(this.listeCours);
    }

    public getOccurence(){
        return this.listeQuestionnaire.getNombreQuestionsParQuestionnaire(this.listeQuestions);
    }

    public getListeParCours(id:number){
        return this.listeQuestionnaire.getListeParCours(id);
    }

    public getQuestionnaire(id:number){
        return this.listeQuestionnaire.getQuestionnaire(id);
    }


    public init(){
        RouteCommune.getInstance().initialiserListeQuestionnaire();
    }

    public creerQuestionnaire(description:string, etat:number, idCours:number){
        return RouteCommune.getInstance().creerQuestionnaire(description, etat, idCours);
    }

    public ajouterQuestionsQuestionnaire(id:number, liste:any){
        return this.listeQuestionnaire.ajouterQuestions(id, liste, this.listeQuestions);
    }

    public supprimerQuestionnaire(id:number){
        this.listeQuestionnaire.supprimerQuestionnaire(id);
    }

    public updateQuestionnaire(id:number, description:string, etat:number, liste:string[]){
        this.listeQuestionnaire.updateQuestionnaire(id,description,etat,liste,this.listeQuestions);
    }
}