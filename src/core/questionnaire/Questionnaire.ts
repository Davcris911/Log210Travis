import {Question} from "../question/Question";
import {Cours} from "../groupe/Cours";
import {ListeQuestions} from "../question/ListeQuestions";
import {ListeCours} from "../groupe/ListeCours";

export class Questionnaire {

    private _id: number;
    private _description: string;
    private _etat: boolean;
    private _questions: Question[];
    private _resultatEtudiant: any[];
    private _cours: Cours;

    constructor(){
        this._questions = [];
        this._resultatEtudiant = [];
    }

    public initialize(id: number, description: string, etat: boolean, cours: Cours) {
        this._id = id;
        this._description = description;
        this._etat = etat;
        this._cours = cours;
    }

    public getId(): number {
        return this._id;
    }

    public setId(value: number) {
        this._id = value;
    }

    public getDescription(): string {
        return this._description;
    }

    public setDescription(value: string) {
        this._description = value;
    }

    public getEtat(): boolean {
        return this._etat;
    }

    public setEtat(value: boolean) {
        this._etat = value;
    }

    public getQuestions(): Question[] {
        return this._questions;
    }

    public setQuestions(value: Question[]) {
        this._questions = value;
    }

    public containsQuestion(idQUestion : number){
        for(let question of this._questions){
            if(question.getId() == idQUestion){
                return true;
            }
        }
        return false;
    }

    public getResultatEtudiant(): any[] {
        return this._resultatEtudiant;
    }
    public setResultatEtudiant(value: any[]) {
        this._resultatEtudiant = value;
    }

    public getCours(): Cours {
        return this._cours;
    }
    public setCours(value: Cours) {
        this._cours = value;
    }

    public convertJsonToObject(objet, listeCours:ListeCours, listeQuestions:ListeQuestions){
        if(objet != null){
            this.setId(objet.id_questionnaire);
            this.setDescription(objet.description);
            this.setEtat(objet.etat);
            this.setQuestions(this.initQuestions(objet.questions, listeQuestions));
            this.setResultatEtudiant(this.initResultatEtudiant(objet.resultatEtudiants, listeCours));
            this.setCours(this.initCours(objet.coursId, listeCours));
        }
    }

    private initQuestions(questions, listeQuestions:ListeQuestions) {
        let arrayQuestions : Question[] = [];
        for(let idQuestion of questions){
            arrayQuestions.push(listeQuestions.getQuestion(idQuestion));
        }
        return arrayQuestions;
    }
    private initCours(coursId, listeCours:ListeCours) {
        return listeCours.afficherCours(coursId);
    }
    private initResultatEtudiant(arrayEtudiantResultat, listeCours:ListeCours) {
        let arrayResultat = [];
        if(arrayEtudiantResultat != null) {
            for (let etudiantResultat of arrayEtudiantResultat) {
                arrayResultat.push([listeCours.afficherEtudiant(etudiantResultat.id), etudiantResultat.resultat]);
            }
        }
        return arrayResultat;
    }

    public ajouterQuestion(question: Question) {
        this._questions.push(question);
    }
}