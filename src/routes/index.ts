import { Request, Response, Router } from "express";
import * as Api from '../controllers/puppeter'

const router = Router();

router.get('/', Api.teste)

export default router;