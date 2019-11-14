import { Router } from 'express';
import UserRouter from './Users';
import AuthRouter from './Auth';

const router = Router();

router.use('/users', UserRouter);
router.use('/auth', AuthRouter);

export default router;
