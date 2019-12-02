import { Router, Request, Response, NextFunction } from 'express';
import * as flash from 'node-twinkle';
import {ListeCours} from '../core/groupe/ListeCours';
import {Questionnaire} from "../core/questionnaire/Questionnaire";
import {RouteCommune} from "./RouteCommune";
import {ListeDevoir} from "../core/devoir/ListeDevoir";
import {Ctrl04} from "../controller/Ctrl04";

export class RouteCu04 {
    router: Router;
    listeCours : ListeCours;
    listeDevoir : ListeDevoir;
    ctrl : Ctrl04;

    constructor() {
        this.router = Router();
        let instance = RouteCommune.getInstance();
        this.listeCours = instance.getListeCours();
        this.listeDevoir = instance.getListeDevoir();
        this.ctrl = new Ctrl04();
        this.init();
    }

//Créer
    public creerDemarrer(req: Request, res: Response, next: NextFunction) {
        RouteCommune.getInstance().initListeDevoir();
        res.render('./Devoir/voirListeCours',
            { title: 'liste Devoir par cours', listeCours : this.ctrl.getListeCours(),
                occurence : this.ctrl.getNbDevoirParCours(),
                flag : "creer"});
    }
    public creerChoisirCours(req: Request, res: Response, next: NextFunction) {
        let id = (Number(req.params.id));
        res.render('./Devoir/creerListeDevoir',
            { title: 'Creer Devoir', listeDevoir : this.ctrl.getDevoirParCours(id), idCours : id});
    }
    public creerDevoir(req: Request, res: Response, next: NextFunction) {
        let description:string = ((req.params.description));
        let noteMaximum: number = (Number(req.params.noteMaximum));
        let dateDebut = new Date((req.params.dateDebut));
        let dateFin = new Date((req.params.dateFin));
        let visible:number = (Number(req.params.visible));
        let idCours:number = (Number(req.params.idCours));
        RouteCommune.getInstance().creerDevoir(description, noteMaximum, dateDebut, dateFin, visible, idCours);
        req.params.id = "" + idCours;
        this.creerChoisirCours(req, res, next);
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
    public voirChoisirDevoir(req: Request, res: Response, next: NextFunction) {
        let id = (Number(req.params.id));
        let idCours = req.query.idCours;
        let trie = req.query.trie;
        res.render('./Devoir/voirDevoir',
            { title: 'Voir Devoir',
                devoir : this.ctrl.getDevoir(id),
                idcours : idCours,
                trie: trie});
    }

    //Supprimer
    public voirSuppressionDevoir(req: Request, res: Response, next: NextFunction) {
        let id = (Number(req.params.id));
        res.render('./Devoir/suppressionDevoir',
            { title: 'Voir Devoir', devoir : this.listeDevoir.getDevoir(id), idDevoir : id});
    }
    public supprimerDevoir(req: Request, res: Response, next: NextFunction) {
        let idDevoir = (Number(req.params.idDevoir));
        this.ctrl.supprimerDevoir(idDevoir);
        this.voirDemarrer(req, res, next);
    }

    //Modifier

    public affichierModifierDevoir(req: Request, res: Response, next: NextFunction) {
        let id = (Number(req.params.idDevoirs));
        let idCours = req.query.idCours;
        let trie = req.query.trie;
        res.render('./Devoir/modifierDevoir',
            { title: 'Voir Devoir', devoir : this.listeDevoir.getDevoir(id), idcours : idCours, trie: trie});
    }

    public modifierDevoir(req: Request, res: Response, next: NextFunction) {
        let id = (Number(req.params.idDevoirs));
        let idCours = req.query.idCours;
        let trie = req.query.trie;
        let visible = (Boolean( req.params.idVisible));
        let idDescription = req.params.idDescription;
        let idDateDebut =  new Date(req.params.idDateDebut);
        let idDateFin = new Date(req.params.idDateFin);
        let idNoteMax = Number(req.params.idNoteMax);
        console.log((req.params.idDateDebut));
        this.listeDevoir.modifierDevoir(id,visible,idDescription,idDateDebut,idDateFin,idNoteMax);
        res.render('./Devoir/voirDevoir',
            { title: 'Voir Devoir', devoir : this.listeDevoir.getDevoir(id), idcours : idCours, trie: trie});
    }

    init() {
        // Créer
        this.router.get('/Creer/demarrer/', this.creerDemarrer.bind(this));
        this.router.get('/Creer/choisirCours/:id', this.creerChoisirCours.bind(this));
        this.router.get('/Creer/creerDevoir/:description/:noteMaximum/:dateDebut/:dateFin/:visible/:idCours', this.creerDevoir.bind(this));

        // Afficher
        this.router.get('/Voir/demarrer', this.voirDemarrer.bind(this));
        this.router.get('/Voir/choisirCours/:id', this.voirChoisirCours.bind(this));
        this.router.get('/Voir/choisirDevoir/:id', this.voirChoisirDevoir.bind(this));

        //Modifier
        this.router.get('/modifier/:idCours/:idDevoirs', this.affichierModifierDevoir.bind(this));
        this.router.get('/modifier/:idCours/:idDevoirs/:idVisible/:idDescription/:idDateDebut/:idDateFin/:idNoteMax', this.modifierDevoir.bind(this));

        // Supprimer
        this.router.get('/Voir/suppressionDevoir/:id', this.voirSuppressionDevoir.bind(this));
        this.router.get('/Voir/supprimerDevoir/:idDevoir/', this.supprimerDevoir.bind(this));

    }

}

export const routeCu04 = new RouteCu04();
routeCu04.init();
