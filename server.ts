import express, { Application, Router } from "express";
import bodyParser from "body-parser";
import Routes from "./src/routes/routes";
import pool from "./src/dbconfig/dbconnector";

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "1mb" }));
  }

  private dbConnect() {
    pool.connect(function (err: Error, client, done) {
      if (err) throw new Error(err.message);
      console.log("Connected to database");
    });
  }

  private routerConfig() {
    this.app.use("/", Routes);
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: Object) => reject(err));
    });
  };
}

export default Server;
