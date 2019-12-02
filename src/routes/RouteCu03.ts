import { Router, Request, Response, NextFunction } from 'express';
import * as flash from 'node-twinkle';
import {ListeCours} from '../core/groupe/ListeCours';
import {Questionnaire} from "../core/questionnaire/Questionnaire";
import {RouteCommune} from "./RouteCommune";
import {ListeDevoir} from "../core/devoir/ListeDevoir";
import {Ctrl03} from "../controller/Ctrl03";

export class RouteCu03 {
    router: Router;
    listeCours : ListeCours;
    listeDevoir : ListeDevoir;
    ctrl : Ctrl03;

    constructor() {
        this.router = Router();
        let instance = RouteCommune.getInstance();
        this.listeCours = instance.getListeCours();
        this.listeDevoir = instance.getListeDevoir();
        this.ctrl = new Ctrl03();
        this.init();
    }

//Afficher
    public voirDemarrer(req: Request, res: Response, next: NextFunction) {
        res.render('./Devoir/voirListeCours',
            { title: 'liste Devoir par cours',
                listeCours : this.ctrl.getListeCours(),
                occurence : this.ctrl.getNbDevoirParCours(),
                flag : "voir"});
    }
    public voirChoisirCours(req: Request, res: Response, next: NextFunction) {
        let id = (Number(req.params.id));
        res.render('./Devoir/voirListeDevoir',
            { title: 'Liste Devoirs',
                listeDevoirs : this.ctrl.getDevoirParCours(id),
                idcours : id});
    }
    public voirCorrectionDevoir(req: Request, res: Response, next: NextFunction) {
        console.log('test');
        let id = (Number(req.params.id));
        let idCours = req.query.idCours;
        let trie = req.query.trie;
        res.render('./Devoir/voirCorrectionDevoir',
            { title: 'Voir correction Devoir',
                devoir : this.ctrl.getDevoir(id),
                idcours : idCours,
                trie: trie});
    }

    //Corriger
    public voirCorrigerDevoir(req: Request, res: Response, next: NextFunction) {
        let id = (Number(req.params.id));
        res.render('./Devoir/corrigerDevoir',
            { title: 'Voir Devoir', devoir : this.listeDevoir.getDevoir(id), idDevoir : id});
    }

    init() {
        // Afficher
        this.router.get('/Voir/demarrer', this.voirDemarrer.bind(this));
        this.router.get('/Voir/choisirCours/:id', this.voirChoisirCours.bind(this));
        this.router.get('/Voir/correctionDevoir/:id', this.voirCorrectionDevoir.bind(this));

       //Corriger
        this.router.get('/Voir/corrigerDevoir/:id', this.voirCorrigerDevoir.bind(this));
    }

}

export const routeCu03 = new RouteCu03();
routeCu03.init();
