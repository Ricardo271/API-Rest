import mongoose from "mongoose";

const autor_schema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: [true, "O nome do(a) autor(a) é obrigatório"]},
        nacionalidade: {type: String}
    },
    {
        versionKey: false
    }
);

const autores = mongoose.model("autores", autor_schema);

export default autores;