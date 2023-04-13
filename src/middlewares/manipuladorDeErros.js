import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipulador_de_erros(err, req, res, next) {
    if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
    } else {
        res.status(500).send({ message: "Erro interno de servidor." });
    }

}

export default manipulador_de_erros;