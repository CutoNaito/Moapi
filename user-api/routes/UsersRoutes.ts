import { Router } from 'express';
import { getAll, getByID, getByUsername, getByEmail, getByToken, create, update, login, verify } from '../controllers/UsersController';

const router = Router();

router.route('/').get(getAll).post(create);
router.route('/:id').get(getByID).put(update);
router.route('/username/:username').get(getByUsername);
router.route('/email/:email').get(getByEmail);
router.route('/login').post(login);
router.route('/token/:token').get(getByToken);
router.route('/verify/:token').post(verify);

export default router;