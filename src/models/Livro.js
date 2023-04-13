import mongoose from "mongoose";

const livro_schema = new mongoose.Schema(
    {
        id: { type: String },
        titulo: { type: String, required: [true, "O título é obrigatório"] },
        autor: { type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O autor é obrigatório"] },
        editora: { type: String, required: [true, "A editora é obrigatória"] },
        numeroPaginas: { type: Number }
    }
);

const livros = mongoose.model("livros", livro_schema);

export default livros;