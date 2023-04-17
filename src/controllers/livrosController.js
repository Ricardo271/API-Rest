import NaoEncontrado from "../Erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {

    static listar_livros = async (req, res, next) => {
        try {
            const busca_livros = livros.find();

            req.resultado = busca_livros;
            
            next();
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
            const busca = await processa_busca(req.query);

            if (busca !== null) {
                const livros_resultado = livros
                    .find(busca)
                    .populate("autor");

                req.resultado = livros_resultado;

                next();
            } else {
                res.status(200).send([]);
            }
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

async function processa_busca(query) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = query;

    let busca = {};

    if (editora) { busca.editora = editora; }
    if (titulo) { busca.titulo = { $regex: titulo, $options: "i" }; }

    if (minPaginas || maxPaginas) {
        busca.numeroPaginas = {};
    }

    if (minPaginas) { busca.numeroPaginas.$gte = minPaginas; }
    if (maxPaginas) { busca.numeroPaginas.$lte = maxPaginas; }

    if (nomeAutor) {
        const regex = new RegExp(nomeAutor, "i");
        const autor = await autores.findOne({ nome: regex });

        if (autor !== null) {
            busca.autor = autor._id;
        } else {
            busca = null;
        }
    }

    return busca;
}

export default LivroController;