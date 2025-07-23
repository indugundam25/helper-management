import { Router } from 'express';
import { HelperController } from '../controllers/helper.controller';
import upload from '../middlewares/multer';
import cloudinary from '../config/cloudinary';

const router = Router();

router.post('/', upload.single('photo'), HelperController.createHelper);
router.get('/', HelperController.getHelpers);
router.get('/:id', HelperController.getHelperById);
router.put('/:id', HelperController.updateHelper);
router.delete('/:id', HelperController.deleteHelper);

export default router;
