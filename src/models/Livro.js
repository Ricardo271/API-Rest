import mongoose from "mongoose";

const livro_schema = new mongoose.Schema(
    {
        id: { type: String },
        titulo: {
            type: String,
            required: [true, "O título é obrigatório"]
        },
        autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "autores",
            required: [true, "O autor é obrigatório"]
        },
        editora: {
            type: String,
            required: [true, "A editora é obrigatória"],
            enum: {
                values: ["Casa do Código", "Alura", "Britanica"],
                message: "A editora {VALUE} não é um valor permitido"
            }
        },
        numeroPaginas: {
            type: Number,
            min: [1, "O número de páginas deve estar entre 1 e 20000. Valor fornecido: {VALUE}"],
            max: [20000, "O número de páginas deve estar entre 1 e 20000. Valor fornecido: {VALUE}"]
        }
    }
);

const livros = mongoose.model("livros", livro_schema);

export default livros;