import mongoose from "mongoose";
import crearAutos from "../models/vehiculos.js";

const CrearVehiculo = async (req, res) => {
    try {
        const { marca, modelo, anio_fabrication, placa, color, tipo_vehiculo, kilometraje, descripcion } = req.body;
        if (!marca || !modelo || !anio_fabrication || !placa || !color || !tipo_vehiculo || !kilometraje || !descripcion) {
        return res.status(400).json({ msg: "Llenar todos los campos" });
        }
        if (marca.length < 3) {
        return res.status(400).json({ msg: "La marca debe tener al menos 3 caracteres" });
        }
        if (modelo.length < 3) {
        return res.status(400).json({ msg: "El modelo debe tener al menos 3 caracteres" });
        }
        if (descripcion.length < 3) {
        return res.status(400).json({ msg: "La descripcion debe tener al menos 3 caracteres" });
        }
        if (placa.length < 3) {
        return res.status(400).json({ msg: "La placa debe tener al menos 3 caracteres" });
        }
        if (color.length < 3) {
        return res.status(400).json({ msg: "El color debe tener al menos 3 caracteres" });
        }
        if (tipo_vehiculo.length < 3) {
        return res.status(400).json({ msg: "El tipo de vehiculo debe tener al menos 3 caracteres" });
        }
        if (kilometraje < 1) {
        return res.status(400).json({ msg: "El kilometraje debe ser mayor a 0" });
        }
        const vehiculo = await crearAutos.findOne({ modelo });
        if (vehiculo) {
        return res.status(400).json({ msg: "Vehiculo ya registrado" });
        }
        const validacionFecha = /^\d{4}-\d{2}-\d{2}$/;
        if (!validacionFecha.test(anio_fabrication)) {
        return res.status(400).json({ msg: "Fecha de ingreso no válida usar este formato YYYY-MM-DD" });
        }
        const nuevoVehiculo = new crearAutos({
        marca,
        modelo,
        anio_fabrication,
        placa,
        color,
        tipo_vehiculo,
        kilometraje,
        descripcion,
        });
        await nuevoVehiculo.save();
        return res.status(201).json({ msg: "Vehiculo creado" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al crear producto" });
    }
}

const ListarVehiculo = async (req, res) => {
    try {
        const vehiculos = await crearAutos.find();
        return res.status(200).json(vehiculos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al listar productos" });
    }
}

const DetalleVehiculo = async (req, res) => {   
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: "ID de vehiculo no válido" });
        }
        const vehiculo = await crearAutos.findById(req.params.id);
        if (!vehiculo) {
        return res.status(400).json({ msg: "Vehiculo no encontrado" });
        }
        return res.status(200).json(vehiculo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al obtener vehiculo" });
    }
}

const ActualizarVehiculo = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: "ID de vehiculo no válido" });
        }
        const { marca, modelo, anio_fabrication, placa, color, tipo_vehiculo, kilometraje, descripcion } = req.body;
        if (!marca || !modelo || !anio_fabrication || !placa || !color || !tipo_vehiculo || !kilometraje || !descripcion) {
        return res.status(400).json({ msg: "Llenar todos los campos" });
        }
        if (marca.length < 3) {
        return res.status(400).json({ msg: "La marca debe tener al menos 3 caracteres" });
        }
        if (modelo.length < 3) {
        return res.status(400).json({ msg: "El modelo debe tener al menos 3 caracteres" });
        }
        if (descripcion.length < 3) {
        return res.status(400).json({ msg: "La descripcion debe tener al menos 3 caracteres" });
        }
        if (placa.length < 3) {
        return res.status(400).json({ msg: "La placa debe tener al menos 3 caracteres" });
        }
        if (color.length < 3) {
        return res.status(400).json({ msg: "El color debe tener al menos 3 caracteres" });
        }
        if (tipo_vehiculo.length < 3) {
        return res.status(400).json({ msg: "El tipo de vehiculo debe tener al menos 3 caracteres" });
        }
        if (kilometraje < 1) {
        return res.status(400).json({ msg: "El kilometraje debe ser mayor a 0" });
        }
        const vehiculo = await crearAutos.findOne({ nombre });
        if (vehiculo) {
        return res.status(400).json({ msg: "Vehiculo ya registrado" });
        }
        const validacionFecha = /^\d{4}-\d{2}-\d{2}$/;
        if (!validacionFecha.test(anio_fabrication)) {
        return res.status(400).json({ msg: "Fecha de ingreso no válida usar este formato YYYY-MM-DD" });
        }
        await crearAutos.findByIdAndUpdate(req.params.id, { marca, modelo, anio_fabrication, placa, color, tipo_vehiculo, kilometraje, descripcion });
        return res.status(200).json({ msg: "Vehiculo actualizado" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al actualizar vehiculo" });
    }
}

const EliminarVehiculo = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: "ID de vehiculo no válido" });
        }
        const vehiculo = await crearAutos.findById(req.params.id);
        if (!vehiculo) {
        return res.status(400).json({ msg: "Vehiculo no encontrado" });
        }
        await crearAutos.findByIdAndDelete(req.params.id);
        return res.status(200).json({ msg: "Vehiculo eliminado" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al eliminar vehiculo" });
    }
}

export { CrearVehiculo, ListarVehiculo, DetalleVehiculo, ActualizarVehiculo, EliminarVehiculo };