import RequisicaoIncorrreta from "../Erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
    try {
        let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

        let [campoOrdenacao, ordem] = ordenacao.split(":");

        // Só para garantir que as variáveis vão ser números
        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ordem = parseInt(ordem);

        const resultado = req.resultado;

        if (limite > 0 && pagina > 0) {
            const resultado_paginado = await resultado.find() // Pelo que testei não precisa desse find(), a função já é exportada com o find()
                .sort({ [campoOrdenacao]: ordem })
                .skip((pagina - 1) * limite)
                .limit(limite)
                .exec();

            res.status(200).json(resultado_paginado);
        } else {
            next(new RequisicaoIncorrreta());
        }
    } catch (err) {
        next(err);
    }
}

export default paginar;