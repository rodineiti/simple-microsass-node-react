import { Router } from 'express';
import linksController from './../controllers/links';

const router = Router();

router.get('/links', linksController.getLinks);

router.post('/links', linksController.postLink);

router.get('/links/:code', linksController.getLink);

router.get('/links/:code/stats', linksController.hitLink);

router.delete('/links/:code', linksController.deleteLink);

export default router;