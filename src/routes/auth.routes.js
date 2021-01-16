import {Router} from 'express';
const router = Router();

import * as middleware from '../middleware/userValidating';
import * as authController from '../controller/auth.controller';

router.post('/signup', authController.signup);
router.post('/signin', [middleware.hasToken,middleware.isAdmin], authController.signin);

export default router;