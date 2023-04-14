import NaoEncontrado from "../Erros/NaoEncontrado.js";
import livros from "../models/Livro.js";

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

    static listar_livros_por_editora = async (req, res, next) => {
        try {
            const editora = req.query.editora;
            const livros_resultado = await livros.find({ "editora": editora }, {});
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
            const livros_resultado = await livros.findByIdAndUpdate(id, {$set: req.body});

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

export default LivroController;