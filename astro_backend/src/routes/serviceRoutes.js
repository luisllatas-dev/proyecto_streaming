import { Router } from 'express';
import verifyApikey from '../../middlewares/auth.js';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

const router = Router();

router.route('/').get(getServices).post(verifyApikey, createService);
router.route('/:id').get(getServiceById).put(verifyApikey ,updateService).delete(verifyApikey, deleteService);

export default router;
