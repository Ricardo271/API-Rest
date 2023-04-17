import NaoEncontrado from "../Erros/NaoEncontrado.js";
import {autores} from "../models/index.js";

class AutorController {

    static listar_autores = async (req, res, next) => {
        try {
            const autores_resultado = autores.find();

            req.resultado = autores_resultado;

            next();
        }catch (err) {
            next(err);
        }

    };

    static listar_autor_por_id = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autor_resultado = await autores.findById(id);

            if (autor_resultado !== null) {
                res.status(200).json(autor_resultado);
            } else {
                next(new NaoEncontrado("Id do autor não localizado."));
            }

        } catch (err) {
            next(err);
        }
    };

    static cadastrar_autor = async (req, res, next) => {
        try {
            let autor = await new autores(req.body);
            const autor_resultado = await autor.save(); 
            res.status(201).send(autor_resultado.toJSON());
        } catch (err) {
            next(err);
        }

    };

    static excluir_autor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autor_resultado = await autores.findByIdAndDelete(id); 

            if (autor_resultado !== null) {
                res.status(200).send({message: "autor removido com sucesso!"});
            } else {
                next(new NaoEncontrado("Id do autor não localizado."));
            }
        } catch (err) {
            next(err);
        }
    };

    static atualizar_autor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autor_resultado = await autores.findByIdAndUpdate(id, {$set: req.body});

            if (autor_resultado !== null) {
                res.status(200).send({message: "autor atualizado com sucesso!"});
            } else {
                next(new NaoEncontrado("Id do autor não localizado."));
            }

        } catch (err) {
            next(err);
        }
    };

}

export default AutorController;