import {Router} from 'express'
import Login from '../controllers/usuariosAutosController.js'

const router = Router()

router.post('/login', Login)

export default router