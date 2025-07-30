import { Router } from 'express';
import { HelperController } from '../controllers/helper.controller';
import { cloudinaryUploadMiddleware } from '../middlewares/multer';
import { uploadHelperFields } from '../middlewares/multer';
const router = Router();

router.post('/', uploadHelperFields, cloudinaryUploadMiddleware, HelperController.createHelper);
router.get('/', HelperController.getHelpers);
router.get('/:id', HelperController.getHelperById);
router.put('/:id', uploadHelperFields, cloudinaryUploadMiddleware, HelperController.updateHelper);
router.delete('/:id', HelperController.deleteHelper);

export default router;
