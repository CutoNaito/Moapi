import { Router } from "express";
import { getAll, getByID, getByID_users, getByID_posts, create, update, remove } from "../../controllers/help/CommentsController";

const router = Router();

router.route("/").get(getAll).post(create);
router.route("/:id").get(getByID).put(update).delete(remove);
router.route("/user/:user_id").get(getByID_users);
router.route("/post/:post_id").get(getByID_posts);

export default router;