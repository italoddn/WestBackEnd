import mongoose from "mongoose";

const filaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    accents: {
        type: Number,
        required: true
    },
    phoneNumber: String
});

const Fila = mongoose.model('Fila', filaSchema);

export default Fila;