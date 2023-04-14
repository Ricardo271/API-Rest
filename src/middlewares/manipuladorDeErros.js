import mongoose from "mongoose";
import ErroBase from "../Erros/ErroBase.js";

// eslint-disable-next-line no-unused-vars
function manipulador_de_erros(err, req, res, next) {
    if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
    } else if (err instanceof mongoose.Error.ValidationError) {
        const mensagens_erro = Object.values(err.errors)
            .map(err => err.message)
            .join("; ");

        res.status(400).send({message: `Os seguintes erros foram encontrados: ${mensagens_erro}`});
    } else {
        new ErroBase().enviar_resposta(res);
    }

}

export default manipulador_de_erros;