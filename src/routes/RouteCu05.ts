import { Router, Request, Response, NextFunction } from 'express';
import * as flash from 'node-twinkle';
import {Ctrl05} from "../controller/Ctrl05";

export class RouteCu05 {
    router: Router;
    ctrl : Ctrl05;

    tempoId:number=0;
    descriptionTempo:string="";
    stateTempo:number=0;
    listeQuestionsTempo : string[];

    constructor() {
        this.router = Router();
        this.ctrl = new Ctrl05();
        this.init();
    }

//Créer
    public creerDemarrer(req: Request, res: Response, next: NextFunction) {
        this.ctrl.init();
        res.render('./Questionnaire/voirListeCours',
            { title: 'liste Cours questionnaire',
                listeCours : this.ctrl.getListeCours(),
                occurence : this.ctrl.getQuestionnaireParCours(),
                flag : "creer"});
    }

    public creerChoisirCours(req: Request, res: Response, next: NextFunction) {
        let id = (Number(req.params.id));
        res.render('./Questionnaire/creerListeQuestionnaire',
            { title: 'Creer Questionnaire',
                listeQuestionnaire : this.ctrl.getListeParCours(id),
                idcours:id});
    }
    public creerChoisirCategorie(req: Request, res: Response, next: NextFunction) {
        let description:string = ((req.params.description));
        let etat:number = (Number(req.params.etat));
        let idCours:number = (Number(req.params.idCours));
        res.render('./Questionnaire/creerChoisirCategorie',
            { title: 'Choisir Categorie',
                questionnaire:this.ctrl.creerQuestionnaire(description, etat, idCours),
                firstTime:true});
    }
    public creerChoisirQuestion(req: Request, res: Response, next: NextFunction) {
        let categorie = ((req.params.categorie));
        let questionnaire = this.ctrl.getQuestionnaire((Number(req.params.idQuestionnaire)));
        res.render('./Questionnaire/creerChoisirQuestion',
            { title: 'Choisir Categorie',
                questionnaire:questionnaire,
                questions:this.ctrl.getListeQuestions(),
                occurence:this.ctrl.getOccurence()});
    }
    public creerAjouterQuestion(req: Request, res: Response, next: NextFunction) {
        let listeQuestions = (req.params.listeQuestions.split(','));
        res.render('./Questionnaire/creerChoisirCategorie',
            { title: 'Choisir Categorie',
            questionnaire:this.ctrl.ajouterQuestionsQuestionnaire((Number(req.params.idQuestionnaire)),listeQuestions)});
    }

//Afficher
    public voirDemarrer(req: Request, res: Response, next: NextFunction) {
        this.ctrl.init();
        res.render('./Questionnaire/voirListeCours',
            { title: 'liste Cours questionnaire',
                listeCours : this.ctrl.getListeCours(),
                occurence : this.ctrl.getQuestionnaireParCours(),
                flag : "voir"});
    }
    public voirChoisirCours(req: Request, res: Response, next: NextFunction) {
        let id = (Number(req.params.id));
        res.render('./Questionnaire/voirListeQuestionnaire',
            { title: 'Liste Questionnaire',
                listeQuestionnaire : this.ctrl.getListeParCours(id),
                idcours : id});
    }
    public voirChoisirQuestionnaire(req: Request, res: Response, next: NextFunction) {
        let id = (Number(req.params.id));
        let idCours = req.query.idCours;
        res.render('./Questionnaire/voirQuestionnaire',
            { title: 'Voir Questionnaire',
                questionnaire : this.ctrl.getQuestionnaire(id),
                idcours : idCours});
    }

    //Supprimer
    public voirSuppressionQuestionnaire(req: Request, res: Response, next: NextFunction) {
        let id = (Number(req.params.id));
        let idCours = req.query.idCours;
        res.render('./Questionnaire/suppressionQuestionnaire',
            { title: 'Voir Questionnaire',
                questionnaire : this.ctrl.getQuestionnaire(id),
                idcours : idCours});
    }
    public supprimerQuestionnaire(req: Request, res: Response, next: NextFunction) {
        let idQuestionnaire = (Number(req.params.idQuesitonnaire));
        this.ctrl.supprimerQuestionnaire(idQuestionnaire);
        this.voirDemarrer(req, res, next);
    }

    //modifier
    public modifierQuestionnaire(req: Request, res: Response, next: NextFunction) {
        this.tempoId = (Number(req.params.idQuestionnaire));
        res.render('./Questionnaire/modifierChoisirQuestion',
            {title: 'Choisir Categorie',
                questionnaire : this.ctrl.getQuestionnaire(this.tempoId),
                questions:this.ctrl.getListeQuestions(),
                occurence: this.ctrl.getOccurence()});
    }

    public modifierChoisirCategorie(req: Request, res: Response, next: NextFunction) {
        this.descriptionTempo = ((req.params.description));
        this.stateTempo = (Number(req.params.etat));
        this.ctrl.updateQuestionnaire(this.tempoId,this.descriptionTempo,this.stateTempo,this.listeQuestionsTempo);
        res.render('./Questionnaire/voirQuestionnaire',
            {title: 'Choisir Categorie',
                questionnaire : this.ctrl.getQuestionnaire(this.tempoId)});
    }

    public modifierAjouterQuestion(req: Request, res: Response, next: NextFunction) {
        this.listeQuestionsTempo = (req.params.listeQuestions.split(','));
        res.render('./Questionnaire/modifierListeQuestionnaire',
            {title: 'Voir Questionnaire',
                questionnaire : this.ctrl.getQuestionnaire(this.tempoId) });
    }


    init() {
        // Créer
        this.router.get('/Creer/demarrer/', this.creerDemarrer.bind(this));
        this.router.get('/Creer/choisirCours/:id', this.creerChoisirCours.bind(this));
        this.router.get('/Creer/choisircategorie/:description/:etat/:idCours', this.creerChoisirCategorie.bind(this));
        this.router.get('/Creer/choisirQuestion/:categorie/:idQuestionnaire', this.creerChoisirQuestion.bind(this));
        this.router.get('/Creer/ajouterQuestions/:idQuestionnaire/:listeQuestions', this.creerAjouterQuestion.bind(this));

        // Afficher
        this.router.get('/Voir/demarrer', this.voirDemarrer.bind(this));
        this.router.get('/Voir/choisirCours/:id', this.voirChoisirCours.bind(this));
        this.router.get('/Voir/choisirQuestionnaire/:id', this.voirChoisirQuestionnaire.bind(this));

        //Modifier
        this.router.get('/Modifier/listeQuestionnaire/:idQuestionnaire', this.modifierQuestionnaire.bind(this));
        this.router.get('/Modifier/ajouterQuestions/:idQuestionnaire/:listeQuestions', this.modifierAjouterQuestion.bind(this));
        this.router.get('/Modifier/choisircategorie/:description/:etat', this.modifierChoisirCategorie.bind(this));

        // Supprimer
        this.router.get('/Voir/suppressionQuestionnaire/:id', this.voirSuppressionQuestionnaire.bind(this));
        this.router.get('/Voir/supprimerQuestionnaire/:idQuesitonnaire/', this.supprimerQuestionnaire.bind(this));
    }

}

export const routeCu05 = new RouteCu05();
routeCu05.init();
