import reservasVehiculos from "../models/reservasAutos.js";
import mongoose from 'mongoose'
import clientesAutos from "../models/clientesAutos.js";
import vehiculos from "../models/vehiculos.js";

const CrearReserva = async (req, res) => {
    try {
        const { codigo, descripcion, id_cliente, id_vehiculo } = req.body
        if (!codigo || !descripcion || !id_cliente || !id_vehiculo) {
            return res.status(400).json({ msg: 'Llenar todos los campos' })
        }
        if (codigo.length < 3) {
            return res.status(400).json({ msg: 'El codigo debe tener al menos 3 caracteres' })
        }
        if (descripcion.length < 3) {
            return res.status(400).json({ msg: 'La descripcion debe tener al menos 3 caracteres' })
        }
        if (id_vehiculo.length < 1) {
            return res.status(400).json({ msg: 'Debe seleccionar al menos un vehiculo' })
        }
        const cliente = await clientesAutos.findById(id_cliente)
        if (!cliente) {
            return res.status(400).json({ msg: 'Cliente no registrado' })
        }
        const vehiculo = await vehiculos.findById(id_vehiculo)
        if (!vehiculo) {
            return res.status(400).json({ msg: 'Vehiculo no registrado' })
        }
        const reserva = await reservasVehiculos.findOne({codigo})
        if (reserva) {
            return res.status(400).json({ msg: 'Reserva ya registrado' })
        }
        const nuevoPedido = new reservasVehiculos({
            codigo,
            descripcion,
            id_cliente,
            id_vehiculo
        })
        await nuevoPedido.save()
        return res.status(201).json({ msg: 'Reserva creado' })
    }catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al crear pedido' })
    }
}

const ListarReserva = async (req, res) => {
    try {
        const reservas = await reservasVehiculos.find().populate('id_cliente',"nombre apellido email").populate('id_vehiculo',"marca modelo anio_fabrication placa color tipo_vehiculo kilometraje descripcion")
        return res.status(200).json(reservas)
    }catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al listar reservas' })
    }
}

const DetalleReserva = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no valido' })
        }
        const reserva = await reservasVehiculos.findById(id).populate('id_cliente',"nombre apellido email").populate('id_vehiculo',"marca modelo anio_fabrication placa color tipo_vehiculo kilometraje descripcion")
        if (!reserva) {
            return res.status(400).json({ msg: 'Reserva no encontrada' })
        }
        return res.status(200).json(reserva)
    }catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al mostrar reserva' })
    }
}

const ActualizarReserva = async (req, res) => {
    try {
        const { id } = req.params
        const { codigo, descripcion, id_cliente, id_vehiculo } = req.body
        if (!codigo || !descripcion || !id_cliente || !id_vehiculo) {
            return res.status(400).json({ msg: 'Llenar todos los campos' })
        }
        if (codigo.length < 3) {
            return res.status(400).json({ msg: 'El codigo debe tener al menos 3 caracteres' })
        }
        if (descripcion.length < 3) {
            return res.status(400).json({ msg: 'La descripcion debe tener al menos 3 caracteres' })
        }
        if (id_vehiculo.length < 1) {
            return res.status(400).json({ msg: 'Debe seleccionar al menos un vehiculo' })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no valido' })
        }
        const cliente = await clientesAutos.findById(id_cliente)
        if (!cliente) {
            return res.status(400).json({ msg: 'Cliente no registrado' })
        }
        const vehiculos = await vehiculos.find({_id: {$in: id_vehiculo}})
        if (vehiculos.length !== id_vehiculo.length) {
            return res.status(400).json({ msg: 'Vehiculo no registrado' })
        }
        const reserva = await reservasVehiculos.findById(id)
        if (!reserva) {
            return res.status(400).json({ msg: 'Reserva no encontrada' })
        }
        await
        reservasVehiculos.findByIdAndUpdate(id, {codigo, descripcion, id_cliente, id_vehiculo})
        return res.status(200).json({ msg: 'Reserva actualizado' })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al actualizar pedido' })
    }
}

const EliminarReserva = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no valido' })
        }
        const reserva = await reservasVehiculos.findById(id)
        if (!reserva) {
            return res.status(400).json({ msg: 'Reserva no encontrada' })
        }
        await reservasVehiculos.findByIdAndDelete(id)
        return res.status(200).json({ msg: 'Reserva eliminada' })
    }catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al eliminar reserva' })
    }
}

export { CrearReserva, ListarReserva, DetalleReserva, ActualizarReserva, EliminarReserva }