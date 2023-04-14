import RequisicaoIncorrreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorrreta {
    constructor(err) {
        const mensagens_erro = Object.values(err.errors)
            .map(err => err.message)
            .join("; ");

        super(`Os seguintes erros foram encontrados: ${mensagens_erro}`);
    }
}

export default ErroValidacao;