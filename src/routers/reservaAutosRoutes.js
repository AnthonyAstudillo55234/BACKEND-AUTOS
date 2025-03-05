import {Router} from 'express'
import {CrearReserva, ListarReserva, DetalleReserva, ActualizarReserva, EliminarReserva} from '../controllers/reservasVehiculosController.js'
import validarJWT from '../middlewares/validacion.js'

const router = Router()

router.post('/crearReserva', validarJWT, CrearReserva)
router.get('/listarReserva', validarJWT, ListarReserva)
router.get('/detalleReserva/:id', validarJWT, DetalleReserva)
router.put('/actualizarPReserva/:id', validarJWT, ActualizarReserva)
router.delete('/eliminarReserva/:id', validarJWT, EliminarReserva)

export default router