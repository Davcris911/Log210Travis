import {Questionnaire} from "./Questionnaire";
import {Cours} from "../groupe/Cours";
import {ListeCours} from "../groupe/ListeCours";
import {ListeQuestions} from "../question/ListeQuestions";
import {Question} from "../question/Question";

export class ListeQuestionnaire {

    private _listeQuestionnaire : Questionnaire[];

    constructor() {
        this._listeQuestionnaire = [];
    }

    public init(listeCours:ListeCours, listeQuestions:ListeQuestions){
        var json = require('../../data/questionnaire.json');
        for(let questionnaireJson of json){
            let questionnaire:Questionnaire = new Questionnaire();
            questionnaire.convertJsonToObject(questionnaireJson, listeCours, listeQuestions);
            this._listeQuestionnaire.push(questionnaire);
        }
    }

    public getListeQuestionnaire(): Questionnaire[] {
        return this._listeQuestionnaire;
    }

    public setListeQuestionnaire(value: Questionnaire[]) {
        this._listeQuestionnaire = value;
    }

    public updateQuestionnaire(id:number,description:string, etat:number, lstquestion:any, listeQuestion:ListeQuestions) {
        this._listeQuestionnaire[id-1].setDescription(description);
        if(etat == 0){
            this._listeQuestionnaire[id-1].setEtat(true);
        } else{
            this._listeQuestionnaire[id-1].setEtat(false);
        }
        this.ajouterQuestions(id,lstquestion, listeQuestion);
    }

    public getListeParCours(idCours : number): Questionnaire[]{
        let listeReturn : Questionnaire[] = [];
        for(let questionnaire of this._listeQuestionnaire){
            let cours = questionnaire.getCours();
            if(cours != undefined && idCours == cours.getId()){
                listeReturn.push(questionnaire);
            }
        }
        return listeReturn;
    }

    public getQuestionnaire(idQuestionnaire : number): Questionnaire{
        for(let questionnaire of this._listeQuestionnaire){
            if(idQuestionnaire == questionnaire.getId()){
                return questionnaire;
            }
        }
        return undefined;
    }

    public getNombreQuestionnaireParCours(listeCours : ListeCours) : Map<number, number>{
        let map = new Map();
        for(let cours of listeCours.getListeCours()){
            let id = cours.getId();
            let ocurence = 0;
            for(let questionnaire of this.getListeQuestionnaire()){
                if(questionnaire.getCours().getId() == id){
                    ocurence++;
                }
            }
            map.set(id,ocurence);
        }
        return map
    }

    public getNombreQuestionsParQuestionnaire(listeQuestion : ListeQuestions) : Map<number, number>{
        let map = new Map();
        for(let question of listeQuestion.getListeQuestion()){
            let id = question.getId();
            let ocurence = 0;
            for(let questionnaire of this.getListeQuestionnaire()){
                for(let questionQuestionnaire of questionnaire.getQuestions()){
                    if(questionQuestionnaire.getId() == id){
                        ocurence++;
                    }
                }
            }
            map.set(id,ocurence);
        }
        return map
    }

    public creerQuestionnaire(description: string, etat: number, cours:Cours): Questionnaire {
        let questionnaire:Questionnaire = new Questionnaire();
        questionnaire.setId(this._listeQuestionnaire.length + 1);
        questionnaire.setDescription(description);
        if(etat == 0){
            questionnaire.setEtat(true);
        } else{
            questionnaire.setEtat(false);
        }
        questionnaire.setCours(cours);
        this._listeQuestionnaire.push(questionnaire);
        return questionnaire;
    }

    public ajouterQuestions(number: number, listeQuestions: any, listeQuestion:ListeQuestions): Questionnaire {
        let questionnaire:Questionnaire = this.getQuestionnaire(number);
        let i;
        let len = listeQuestions.length;
        let ques:Question[] =[];
        questionnaire.setQuestions(ques);
        for(i=0; i<len; i++){
            //console.log('AjouterQUestion' + listeQuestions[i]);
            if(!questionnaire.containsQuestion(listeQuestions[i])){
                questionnaire.ajouterQuestion(listeQuestion.getQuestion(listeQuestions[i]));
            }
        }
        return questionnaire;
    }

    public afficherQuestionnaire(id : number): Questionnaire{
        let position:number;
        let i:number = 0;
        for(let question of this._listeQuestionnaire){
            if(id == question.getId()){
                position = i;
            }
            i++;
        }
        if(position != null){
            return this._listeQuestionnaire[position];
        }
    }

    public  supprimerQuestionnaire(is : number): Questionnaire[]{
        return this.getListeQuestionnaire().splice(is-1,1);
    }

    public  supprimerQuestionnaireCours(idCours : number){
        let listeQuestionnaires:Questionnaire[] = this.getListeParCours(idCours);
        for (let questionnaire of listeQuestionnaires){
            this.supprimerQuestionnaire(questionnaire.getId());
        }
    }
}