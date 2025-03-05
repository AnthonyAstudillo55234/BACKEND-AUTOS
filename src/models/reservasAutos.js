import {Schema, model, mongo} from 'mongoose'

const reservasVehiculosSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        trim:true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true,
        trim:true
    },
    id_cliente: {
        type: Schema.Types.ObjectId,
        ref: 'clientesAutos',
        required: true
    },
    id_vehiculo: [{
        type: Schema.Types.ObjectId,
        ref: 'vehiculos',
        required: true
    }] 
})

export default model('reservasVehiculos', reservasVehiculosSchema)