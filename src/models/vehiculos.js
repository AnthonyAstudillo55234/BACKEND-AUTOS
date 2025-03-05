import {Schema, model} from 'mongoose'

const vehiculosSchema = new Schema({
    marca: {
        type: String,
        required: true,
        trim:true
    },
    modelo: {
        type: String,
        required: true,
        trim:true,
    },
    anio_fabrication: {
        type: Date,
        required: true,
        trim:true
    },
    placa: {
        type: String,
        required: true,
        trim:true,
    },
    color: {
        type: String,
        required: true,
        trim:true
    },
    tipo_vehiculo: {
        type: String,
        required: true,
        trim:true
    },
    kilometraje: {
        type: Number,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim:true
    },
})

export default model('vehiculos', vehiculosSchema)