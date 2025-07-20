import { getCollections } from "../controller/collections";
import express, { Request, Response, NextFunction } from "express";
import { deleteCollection } from "../controller/delete-collections";
const router = express.Router();

router.get("/collections", getCollections);

router.delete(
  "/collections",
  (req: Request, res: Response, next: NextFunction) => {
    deleteCollection(req, res).catch(next);
  }
);



export default router;
