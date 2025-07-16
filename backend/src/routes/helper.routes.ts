import { Router } from 'express';
import { HelperController } from '../controllers/helper.controller';

const router = Router();

router.post('/', HelperController.createHelper);
router.get('/', HelperController.getHelpers);
router.get('/:id', HelperController.getHelperById);
router.put('/:id', HelperController.updateHelper);
router.delete('/:id', HelperController.deleteHelper);

export default router; 