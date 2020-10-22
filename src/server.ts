import express from 'express';
import db from './database/index';
import cors from 'cors';
import routes from './router';

class Serve {
   server: any;
   constructor(){
    this.server  = express();
    this.dataBase();
    this.router();
   }
   dataBase() {
    db.authenticate();
   }
   middlaware() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(express.json());
}
   router() {
    this.server.use(routes)
   }
}
export default new Serve().server