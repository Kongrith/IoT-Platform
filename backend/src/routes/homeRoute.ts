import * as authController from '../controllers/authController';

import { Request, Response, Router, } from 'express';
import { auth } from '../middleware/auth';
const router = Router();

router.route('/').get((req: Request, res: Response):void => {
    res.send('Home');
});

// console.log('check type',typeof authController)
router.route('/login').post(authController.login)
router.route('/register').post(authController.register)
router.route('/users').get(authController.users)


router.route('/about').get((req: Request, res: Response):void => {
    res.send('Hello from express and typescript');
});

// เพิ่ม auth
router.route('/dashboard').get(auth, authController.dashboard)
router.route('/profile').get(auth, authController.profile)

export default router;