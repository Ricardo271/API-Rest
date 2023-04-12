import autores from "../models/Autor.js";

class AutorController {

    static listar_autores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores);
        });
    };

    static listar_autor_por_id = (req, res) => {
        const id = req.params.id;

        autores.findById(id, (err, autores) => {
            if (err) {
                res.status(400).send({message: `${err.message} - Id do autor não localizado.`});
            } else {
                res.status(200).json(autores);
            }
        });
    };

    static cadastrar_autor = (req, res) => {
        let autor = new autores(req.body);

        autor.save((err) => {
            if (err) {
                res.status(500).send({message: `${err.message} - falha ao cadastrar autor.`});
            } else {
                res.status(201).send(autor.toJSON());
            }
        });
    };

    static excluir_autor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({message: "autor removido com sucesso!"});
            } else {
                res.status(500).send({message: err.message});
            }
        });
    };

    static atualizar_autor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (!err) {
                res.status(200).send({message: "autor atualizado com sucesso!"});
            } else {
                res.status(500).send({message: err.message});
            }
        });
    };

};

export default AutorController;