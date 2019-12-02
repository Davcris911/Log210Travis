import { ListeCours } from "../core/groupe/ListeCours";
import { ListeQuestions } from "../core/question/ListeQuestions";
import { ListeQuestionnaire } from "../core/questionnaire/ListeQuestionnaire";
import { ListeEnseignant } from "../core/groupe/ListeEnseignant";
import { ListeDevoir } from "../core/devoir/ListeDevoir";
import {Questionnaire} from "../core/questionnaire/Questionnaire";
import {response} from "express";
import {Devoir} from "../core/devoir/Devoir";
import {Cours} from "../core/groupe/Cours";

export class RouteCommune {

    private static instance: RouteCommune;

    private _listeCours : ListeCours;
    private _listeQuestions : ListeQuestions;
    private _listeQuestionnaire : ListeQuestionnaire;
    private _listeEnseignant : ListeEnseignant;
    private _listeDevoir : ListeDevoir;

    jsonCours : any;
    jsonEtudiant : any;

    flagCours : boolean;
    flagQuestionnaire : boolean;
    flagDevoir : boolean;

    private constructor() {
        this._listeCours = new ListeCours();
        this._listeQuestions = new ListeQuestions();
        this._listeQuestionnaire = new ListeQuestionnaire();
        this._listeDevoir = new ListeDevoir();

        this.flagCours = false;
        this.flagQuestionnaire = false;
        this.flagDevoir = false;

        this.loadListeCours();
        this.loadListeEtudiant();
    }

    public static getInstance(){
        if(!RouteCommune.instance) {
            RouteCommune.instance = new RouteCommune()
        }
        return RouteCommune.instance;
    }

    public getListeCours(): ListeCours {
        return this._listeCours;
    }
    public getListeQuestions(): ListeQuestions {
        return this._listeQuestions;
    }
    public getListeQuestionnaire(): ListeQuestionnaire {
        return this._listeQuestionnaire;
    }
    public getListeDevoir(): ListeDevoir {
        return this._listeDevoir;
    }

    private async loadListeCours() {
        try {
            const axios = require('axios').default;

            this.jsonCours = await axios.get(
                'http://localhost:3001/api/v1//courses',
                {'headers': {'token': '07e74791d927adb57bc6cd448aa7e34f'}}
            ).then(function (response) {
                return response.data;
            }).catch(function (error) {
                console.log("ERROR requete LoadListeCours");
            });
        } catch (e) {
            console.log(e)
        }
    }

    private async loadListeEtudiant() {
        try {
            const axios = require('axios').default;

            this.jsonEtudiant = await axios.get(
                'http://localhost:3001/api/v1//students',
                {'headers': {'token': '07e74791d927adb57bc6cd448aa7e34f'}}
            ).then(function (response) {
                return response.data;
            }).catch(function (error) {
                console.log("ERROR requete LoadListeEtudiant");
            });
        } catch (e) {
            console.log(e)
        }
    }

    public async connexionProfesseur(email:string, password:string){
        let reponse = await this.getAxios('http://localhost:3001/api/v1/login?email='+email+'&password='+password);
        return response;
    }

    private async getAxios(url : string){
        try {
            const axios = require('axios').default;

            this.jsonEtudiant = await axios.get(
                ''+url
            ).then(function (response) {
                return response.data;
            }).catch(function (error) {
                console.log("ERROR requete LoadListeEtudiant");
            });

        } catch (e) {
            console.log(e)
        }
    }

    public initialiserListeCours() {
        if(!this.flagCours){
            this.flagCours = true;
            if(this.jsonEtudiant !== undefined){
                this.jsonEtudiant = this.jsonEtudiant.data;
            }
            this._listeCours.jsonToFile(this.jsonEtudiant);
        }
    }

    public getAllCoursSGB() {
        this.jsonCours = require('../data/sgb/courses.json');
        let tmp = new ListeCours();
        tmp.convertJsonCours(this.jsonCours);
        return tmp;
    }

    public supprimerCours(idCours: number) {
        this._listeCours.supprimer(idCours);
        this._listeQuestionnaire.supprimerQuestionnaireCours(idCours);
    }

    public initialiserListeQuestionnaire() {
        if(!this.flagQuestionnaire){
            this.initialiserListeCours();
            this.flagQuestionnaire = true;
            this._listeQuestionnaire.init(this._listeCours, this._listeQuestions);
        }
    }

    public creerQuestionnaire(description: string, etat: number, idCours:number): Questionnaire {
        return this._listeQuestionnaire.creerQuestionnaire(description, etat, this._listeCours.afficherCours(idCours));
    }

    public initListeDevoir() {
        if(!this.flagDevoir){
            this.initialiserListeCours();
            this.flagDevoir = true;
            this._listeDevoir.init(this._listeCours);
        }
    }


    public creerDevoir(description: string, noteMaximale: number, dateDebut: Date, dateFin: Date, visible: number, idCours:number): Devoir {
        return this._listeDevoir.creerDevoir(description, noteMaximale, dateDebut, dateFin,  visible, this._listeCours.afficherCours(idCours));
    }
}