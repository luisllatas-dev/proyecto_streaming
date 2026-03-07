import { Router } from 'express';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

const router = Router();

router.route('/').get(getServices).post(createService);
router.route('/:id').get(getServiceById).put(updateService).delete(deleteService);

export default router;
