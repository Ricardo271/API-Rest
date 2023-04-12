import livros from "../models/Livro.js";

class LivroController {

    static listar_livros = (req, res) => {
        livros.find()
            .populate("autor")
            .exec((err, livros) => {
            res.status(200).json(livros);
        });
    };

    static listar_livro_por_id = (req, res) => {
        const id = req.params.id;

        livros.findById(id)
            .populate("autor", "nome")
            .exec((err, livros) => {
            if (err) {
                res.status(400).send({message: `${err.message} - Id do livro não localizado.`});
            } else {
                res.status(200).json(livros);
            }
        });
    };

    static listar_livros_por_editora = (req, res) => {
        const editora = req.query.editora;

        livros.find({"editora": editora}, {}, (err, livros) => {
            res.status(200).send(livros);
        });
    };

    static cadastrar_livro = (req, res) => {
        let livro = new livros(req.body);

        livro.save((err) => {
            if (err) {
                res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`});
            } else {
                res.status(201).send(livro.toJSON());
            }
        });
    };

    static excluir_livro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({message: "Livro removido com sucesso!"});
            } else {
                res.status(500).send({message: err.message});
            }
        });
    };

    static atualizar_livro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (!err) {
                res.status(200).send({message: "Livro atualizado com sucesso!"});
            } else {
                res.status(500).send({message: err.message});
            }
        });
    };

};

export default LivroController;