import mongoose from "mongoose";

const historicoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    accents: {
        type: Number,
        required: true
    },
    phoneNumber: String,
    stats: String,

    timeInLine: {
        type: String,
    }

}, {
    timestamps: true
});

const Historico = mongoose.model('Historico', historicoSchema);

export default Historico;