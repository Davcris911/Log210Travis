import { Router, Request, Response, NextFunction } from 'express';
import * as flash from 'node-twinkle';
import {Ctrl01} from "../controller/Ctrl01";

export class RouteCu01 {
    router: Router;
    ctrl:Ctrl01;

    constructor() {
        this.router = Router();
        this.ctrl = new Ctrl01();
        this.init();
    }

// Ajouter
    public demarrer(req: Request, res: Response, next: NextFunction) {
        this.ctrl.demarrer();
        res.render('./Groupe/creerDemarrer', { title: 'Liste Cours SGB',
            listeCours : this.ctrl.getListeSGB(), listeCoursExistant:this.ctrl.getListeSigleCours()});
    }
    public ajouterCours(req: Request, res: Response, next: NextFunction) {
        this.ctrl.ajouterCours(Number(req.params.id));
        req.params.ajout = "true";
        this.choisirCours(req, res, next);
    }

// Afficher
    public voirListeCours(req: Request, res: Response, next: NextFunction) {
        this.ctrl.init();
        res.render('./Groupe/voirListeCours', { title: 'Voir liste cours', listeCours : this.ctrl.getListeCours()});
    }

    public choisirCours(req: Request, res: Response, next: NextFunction) {
        let cour = this.ctrl.afficherCours(Number(req.params.id));
        res.render('./Groupe/voirCours', { title: 'Voir cours', cour : cour, ajout:req.params.ajout});
    }

// Supprimer
    public supprimerCours(req: Request, res: Response, next: NextFunction) {
        this.ctrl.supprimerCours(Number(req.params.id));
        res.render('./Groupe/voirListeCours', { title: 'Voir liste cours', listeCours : this.ctrl.getListeCours()});
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        //Ajouter
        this.router.get('/Creer/demarrer/', this.demarrer.bind(this));
        this.router.get('/Creer/ajouterCours/:id', this.ajouterCours.bind(this));
        //Afficher
        this.router.get('/voirListeCours/', this.voirListeCours.bind(this));
        this.router.get('/choisirCours/:id', this.choisirCours.bind(this));
        //Supprimer
        this.router.get('/supprimerCours/:id', this.supprimerCours.bind(this));
    }

}

// exporter its configured Express.Router
export const routeCu01 = new RouteCu01();
routeCu01.init();
