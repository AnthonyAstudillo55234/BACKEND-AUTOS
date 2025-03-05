import {Router} from 'express'
import { CrearVehiculo, ListarVehiculo, DetalleVehiculo, ActualizarVehiculo, EliminarVehiculo } from '../controllers/vehiculosController.js'
import validarJWT from '../middlewares/validacion.js'

const router = Router()

router.post('/crearVehiculo', validarJWT, CrearVehiculo)
router.get('/listarVehiculo', validarJWT, ListarVehiculo)
router.get('/detalleVehiculo/:id', validarJWT, DetalleVehiculo)
router.put('/actualizarVehiculo/:id', validarJWT, ActualizarVehiculo)
router.delete('/eliminarVehiculo/:id', validarJWT, EliminarVehiculo)

export default router