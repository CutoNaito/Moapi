import { Router } from "express";
import { getAll, getByID, getByID_users, getByTitle, getByBody, create, update, remove } from "../../controllers/help/PostsController";

const router = Router();

router.route("/").get(getAll).post(create);
router.route("/:id").get(getByID).put(update).delete(remove);
router.route("/user/:user_id").get(getByID_users);
router.route("/title/:title").get(getByTitle);
router.route("/body/:body").get(getByBody);

export default router;