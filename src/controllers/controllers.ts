import pool from "../dbconfig/dbconnector";
import { Request, Response } from "express";
import { randomUUID } from "crypto";

export default class Controller {
  public async getCookies(req: Request, res: Response) {
    try {
      const client = await pool.connect();
      const siteId = parseInt(req.params.id);
      const sql =
        "SELECT (tag_id, cookie_name, cookie_category) FROM cookies WHERE site_id = $1";
      const { rows } = await client.query(sql, [siteId]);
      const cookies = rows;

      client.release();

      res.send(cookies);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async createCookie(req: Request, res: Response) {
    try {
      const client = await pool.connect();

      const requestCreateCookie = req.body;
      /* Needs validation */
      const dataConsentDate = new Date();
      let rows: any[] = [];

      requestCreateCookie.map(async (element: any) => {
        let tagId = randomUUID();
        const sql =
          "INSERT INTO cookies (cookie_name, cookie_category, tag_id, site_id) VALUES ($1, $2, $3, $4)";

        rows.push(
          await client.query(sql, [
            element.cookieName,
            element.cookieCategory,
            tagId,
            element.siteId,
          ])
        );
      });
      const cookie = rows;

      res.send(cookie);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async updateCookies(req: Request, res: Response) {
    try {
      const client = await pool.connect();

      const updateCookieRequest = req.body;
      let rows: any[] = [];

      updateCookieRequest.map(async (element: any) => {
        const sql = "UPDATE cookies SET cookie_category = $1 WHERE tag_id = $2";
        rows.push(
          await client.query(sql, [element.cookieCategory, element.cookieId])
        );
      });

      const cookieUpdated = rows;

      res.send(cookieUpdated);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  public async deleteCookies(req: Request, res: Response) {
    try {
      const client = await pool.connect();

      const siteId = parseInt(req.params.id);

      const sql = "UPDATE cookies SET tag_id = null WHERE site_id = $1";
      await client.query(sql, [siteId]);

      res.send(`Cookie with ID: ${siteId} deleted`);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
