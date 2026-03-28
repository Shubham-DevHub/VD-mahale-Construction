import express from 'express';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import { getAll, createResource, updateResource, deleteResource } from '../controllers/resourceController.js';

const router = express.Router();

export const generateRoutes = (modelName) => {
  const resourceRouter = express.Router();
  resourceRouter.use(verifyToken);
  
  resourceRouter.get('/', getAll(modelName));
  resourceRouter.post('/', isAdmin, createResource(modelName));
  resourceRouter.put('/:id', isAdmin, updateResource(modelName));
  resourceRouter.delete('/:id', isAdmin, deleteResource(modelName));
  
  return resourceRouter;
};

export default router;
