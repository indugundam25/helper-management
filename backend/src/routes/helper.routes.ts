import { Router } from 'express';
import { HelperController } from '../controllers/helper.controller';
import { cloudinaryUploadMiddleware } from '../middlewares/multer';
import { uploadSingleImage } from '../middlewares/multer';
const router = Router();

router.post('/', uploadSingleImage, cloudinaryUploadMiddleware, HelperController.createHelper);
router.get('/', HelperController.getHelpers);
router.get('/:id', HelperController.getHelperById);
router.put('/:id', HelperController.updateHelper);
router.delete('/:id', HelperController.deleteHelper);

export default router;
