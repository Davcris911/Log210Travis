import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as flash from 'node-twinkle';
import * as ExpressSession from 'express-session';

import { routeCu01 } from './routes/RouteCu01';
import { routeCu02 } from './routes/RouteCu02';
import { routeCu04 } from "./routes/RouteCu04";
import { routeCu05 } from './routes/RouteCu05';
import {routeCu03} from "./routes/RouteCu03";

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.expressApp.set('view engine', 'pug');
    this.expressApp.use(express.static(__dirname + '/public')); // https://expressjs.com/en/starter/static-files.html
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger('dev'));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(ExpressSession(
      { secret: 'My Secret Key',
        resave: false,
        saveUninitialized: true}));
    this.expressApp.use(flash); // https://www.npmjs.com/package/node-twinkle typed using https://stackoverflow.com/a/53786892/1168342 (solution #2)
  }

  // Configure API endpoints.
  private routes(): void {

    let router = express.Router();

    // placeholder route handler
    router.get('/', (req, res, next) => {
      let messages = res.locals.has_flashed_messages() ? res.locals.get_flashed_messages() : [];
      res.render('index', { title: 'Moodle', flashedMessages: messages });
    });

    this.expressApp.use('/', router);  // routage de base
    this.expressApp.use('/Groupe', routeCu01.router);
    this.expressApp.use('/Question', routeCu02.router);
    this.expressApp.use('/Devoir', routeCu03.router);
    this.expressApp.use('/Devoir', routeCu04.router);
    this.expressApp.use('/Questionnaire', routeCu05.router);
  }

}

export default new App().expressApp;
