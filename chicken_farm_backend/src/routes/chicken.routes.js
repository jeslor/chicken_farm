import express from "express";
import {
  getChickens,
  addChicken,
  deleteChicken,
} from "../controllers/chicken.controller.js";

const router = express.Router();

router.get("/", getChickens);
router.post("/", addChicken);
router.delete("/:id", deleteChicken);

export default router;
