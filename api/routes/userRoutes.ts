import { Router } from 'express';
const multer = require('multer');
const { createUser, signinUser, getCurrentUser, handleLogout, handleRefreshToken, uploadProfile } = require('../controllers/userControllers');
const {verifyJWT} = require('../middleware/verifyJWT');
const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/auth/user/signup', createUser);
router.post('/auth/signin', signinUser);
router.get('/me', verifyJWT, getCurrentUser);
router.get('/refreshToken', handleRefreshToken);
router.get('/logout', handleLogout);
router.post('/profile/upload',upload.single('avatar'), uploadProfile);

export default router;