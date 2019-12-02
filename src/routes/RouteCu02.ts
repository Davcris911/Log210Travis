import { Router, Request, Response, NextFunction } from 'express';
import * as flash from 'node-twinkle';

import { Question } from '../core/question/Question';
import { ListeQuestions } from '../core/question/ListeQuestions';
import {RouteCommune} from "./RouteCommune";
import {Ctrl02} from "../controller/Ctrl02";

export class RouteCu02 {
    router: Router;
    //questions: ListeQuestions;
    ctrl : Ctrl02;

    constructor() {
        this.router = Router();
        this.ctrl = new Ctrl02();
        //this.questions = RouteCommune.getInstance().getListeQuestions();
        this.init();
    }

    public voirListeQuestion(req: Request, res: Response, next: NextFunction) {
        res.render('./Question/voirListeQuestion',
            { title: 'Voir liste questions',
            listeQuestions : this.ctrl.getQuestions()});
    }

    public choisirQuestion(req: Request, res: Response, next: NextFunction) {
        res.render('./Question/voirQuestion',
            { title: 'Voir question',
            question : this.ctrl.getQuestion(Number(req.params.id)) });
    }

    public modifierQuestion(req: Request, res: Response, next: NextFunction) {
        res.render('./Question/modifierQuestion',
            { title: 'Voir question',
                question : this.ctrl.getQuestion(Number(req.params.id)) });
    }

    public modifierUneQuestion(req: Request, res: Response, next: NextFunction) {
        //let question = this.questions.modifierQuestion();
        res.render('./Question/modifierQuestion',
            { title: 'Voir question',
                question : this.ctrl.getQuestion(Number(req.params.id))});
    }

    public supprimerQuestions(req: Request, res: Response, next: NextFunction) {
        this.ctrl.supprimerQuestion(Number(req.params.id));
        this.voirListeQuestion(req, res, next);
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/voirListeQuestions/', this.voirListeQuestion.bind(this));
        this.router.get('/voirQuestion/:id', this.choisirQuestion.bind(this));
        this.router.get('/modifierQuestion/:id', this.modifierQuestion.bind(this));
        this.router.get('/supprimerQuestion/:id', this.supprimerQuestions.bind(this));
    }

}

// exporter its configured Express.Router
export const routeCu02 = new RouteCu02();
routeCu02.init();
