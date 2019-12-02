import { Question } from "./Question";
import { Reponse } from "./Reponse";
import {Cours} from "../groupe/Cours";

export class ListeQuestions{

    private listeQuestion : Question[];

    constructor(){
        this.listeQuestion = [];
        this.init();
    }

    public getListeQuestion(): Question[] {
        return this.listeQuestion;
    }

    public setListeQuestion(value: Question[]) {
        this.listeQuestion = value;
    }

    public getQuestion(id : number): Question{
        let position:number = null;
        let i:number = 0;
        for(let question of this.listeQuestion){
            if(id == question.getId()){
                position = i;
            }
            i++;
        }
        if(position != null){
            return this.listeQuestion[position];
        }
        return undefined;
    }

    public afficherQuestion(id : number): Question{
        let position:number;
        let i:number = 0;
        for(let question of this.listeQuestion){
            if(id == question.getId()){
                position = i;
            }
            i++;
        }
        if(position != null){
            return this.listeQuestion[position];
        }
    }

    public supprimerQuestion(is : number): Question[] {
        return this.getListeQuestion().splice(is-1,1);
    }

    public modifierQuestion(id : number): Question {
        this.listeQuestion[(id-1)].setId(9999);
        id=99999;
        return this.listeQuestion[(id-1)];
    }

    public init(){
        var json = require('../../data/questions.json');
        for(let questionReponseJson of json){
            let reponse:Reponse = new Reponse();
            let question:Question = new Question();
            question.convertJsonToObject(questionReponseJson);
            reponse.convertJsonToObject(questionReponseJson);
            question.setReponse(reponse);
            this.listeQuestion.push(question);
        }
    }
}