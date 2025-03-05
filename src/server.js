import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import rutaUsuariosAutos from './routers/usuarioAutosRoutes.js'
import rutaClientesAutos from './routers/clientesAutosRoutes.js'
import rutaCrearVehiculo from './routers/vehiculosRoutes.js'
import rutaReservasVehiculos from './routers/reservaAutosRoutes.js'

const app = express()
dotenv.config()
app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(express.json())

app.use('/api/', rutaUsuariosAutos)
app.use('/api/', rutaClientesAutos)
app.use('/api/', rutaCrearVehiculo)
app.use('/api/', rutaReservasVehiculos)

app.use((req, res) => {
    res.status(404).json({ msg: 'Ruta no encontrada' })
})

export default app