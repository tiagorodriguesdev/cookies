import express, { Router } from "express";
import Controller from "../controllers/controllers";

const router = Router();
const controller = new Controller();

router.get("/cookies/:id", controller.getCookies);
router.post("/cookies", controller.createCookie);
router.put("/cookies/:id", controller.updateCookies);
router.delete("/cookies/:id", controller.deleteCookies);

export default router;
