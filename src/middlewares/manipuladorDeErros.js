import mongoose from "mongoose";
import ErroBase from "../Erros/ErroBase.js";
import RequisicaoIncorrreta from "../Erros/RequisicaoIncorreta.js";
import ErroValidacao from "../Erros/ErroValidacao.js";

// eslint-disable-next-line no-unused-vars
function manipulador_de_erros(err, req, res, next) {
    if (err instanceof mongoose.Error.CastError) {
        new RequisicaoIncorrreta().enviar_resposta(res);
    } else if (err instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(err).enviar_resposta(res);
    } else {
        new ErroBase().enviar_resposta(res);
    }

}

export default manipulador_de_erros;