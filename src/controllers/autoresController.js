import autores from "../models/Autor.js";

class AutorController {

    static listar_autores = async (req, res) => {
        try {
            const autores_resultado = await autores.find();
            res.status(200).json(autores_resultado);
        }catch (err) {
            res.status(500).json({message: "Erro interno do servidor"});
        }

    };

    static listar_autor_por_id = async (req, res) => {
        try {
            const id = req.params.id;
            const autor_resultado = await autores.findById(id);
            res.status(200).json(autor_resultado);
        } catch (err) {
            res.status(400).json({message: `${err.message} - Id do autor não localizado.`});
        }
    };

    static cadastrar_autor = async (req, res) => {
        try {
            let autor = await new autores(req.body);
            const autor_resultado = await autor.save(); 
            res.status(201).send(autor_resultado.toJSON());
        } catch (err) {
            res.status(500).send({message: `${err.message} - falha ao cadastrar autor.`});
        }

    };

    static excluir_autor = async (req, res) => {
        try {
            const id = req.params.id;
            await autores.findByIdAndDelete(id); 
            res.status(200).send({message: "autor removido com sucesso!"});
        } catch (err) {
            res.status(500).send({message: err.message});            
        }
    };

    static atualizar_autor = async (req, res) => {
        try {
            const id = req.params.id;
            await autores.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "autor atualizado com sucesso!"});
        } catch (err) {
            res.status(500).send({message: err.message});
        }
    };

}

export default AutorController;