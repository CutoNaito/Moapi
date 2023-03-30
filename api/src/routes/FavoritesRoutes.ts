import { Router } from "express";
import { getAll, getByID, getByID_users, getByURI, getByMethod, create } from "../controllers/FavoritesController";

const router = Router();

router.route("/").get(getAll).post(create);
router.route("/:id").get(getByID);
router.route("/user/:user_id").get(getByID_users);
router.route("/uri/:uri").get(getByURI);
router.route("/method/:method").get(getByMethod);

export default router;