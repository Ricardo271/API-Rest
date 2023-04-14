import NaoEncontrado from "../Erros/NaoEncontrado.js";
import { livros } from "../models/index.js";

class LivroController {

    static listar_livros = async (req, res, next) => {
        try {
            const livros_resultado = await livros.find().populate("autor").exec();
            res.status(200).json(livros_resultado);
        } catch (err) {
            next(err);
        }
    };

    static listar_livro_por_id = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livros_resultado = await livros.findById(id).populate("autor", "nome").exec();

            if (livros_resultado !== null) {
                res.status(200).json(livros_resultado);
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }

        } catch (err) {
            next(err);
        }
    };

    static listar_livros_por_filtro = async (req, res, next) => {
        try {
            const busca = processa_busca(req.query);

            const livros_resultado = await livros.find(busca);

            res.status(200).send(livros_resultado);
        } catch (err) {
            next(err);
        }
    };

    static cadastrar_livro = async (req, res, next) => {
        try {
            let livro = await new livros(req.body);
            await livro.save();
            res.status(201).send(livro.toJSON());
        } catch (err) {
            next(err);
        }
    };

    static excluir_livro = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livros_resultado = await livros.findByIdAndDelete(id);

            if (livros_resultado !== null) {
                res.status(200).send({ message: "Livro removido com sucesso!" });
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }

        } catch (err) {
            next(err);
        }
    };

    static atualizar_livro = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livros_resultado = await livros.findByIdAndUpdate(id, { $set: req.body });

            if (livros_resultado !== null) {
                res.status(200).send({ message: "Livro atualizado com sucesso!" });
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }

        } catch (err) {
            next(err);
        }
    };

}

function processa_busca(query) {
    const { editora, titulo, minPaginas, maxPaginas } = query;

    const busca = {};

    if (editora) { busca.editora = editora; }
    if (titulo) { busca.titulo = { $regex: titulo, $options: "i" }; }

    if (minPaginas || maxPaginas) {
        busca.numeroPaginas = {};
    }

    if (minPaginas) { busca.numeroPaginas.$gte = minPaginas; }
    if (maxPaginas) { busca.numeroPaginas.$lte = maxPaginas; }

    return busca;
}

export default LivroController;