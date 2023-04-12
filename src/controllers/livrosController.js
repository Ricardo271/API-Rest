import livros from "../models/Livro.js";

class LivroController {

    static listar_livros = async (req, res) => {
        try {
            const livros_resultado = await livros.find().populate("autor").exec();
            res.status(200).json(livros_resultado);
        } catch (err) {
            res.status(500).json({message: `${err}`});
        }
    };

    static listar_livro_por_id = async (req, res) => {
        try {
            const id = req.params.id;
            const livros_resultado = await livros.findById(id).populate("autor", "nome").exec();
            res.status(200).json(livros_resultado);
        } catch (err) {
            res.status(400).send({ message: `${err.message} - Id do livro não localizado.` });
        }
    };

    static listar_livros_por_editora = async (req, res) => {
        try {
            const editora = req.query.editora;
            const livros_resultado = await livros.find({ "editora": editora }, {});
            res.status(200).send(livros_resultado);
        } catch (err) {
            res.status(400).send({ message: `${err.message} - Editora do livro não localizado.` });
        }
    };

    static cadastrar_livro = async (req, res) => {
        try {
            let livro = await new livros(req.body);
            await livro.save();
            res.status(201).send(livro.toJSON());            
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar livro.` });
        }
    };

    static excluir_livro = async (req, res) => {
        try {
            const id = req.params.id;
            await livros.findByIdAndDelete(id);
            res.status(200).send({ message: "Livro removido com sucesso!" });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };

    static atualizar_livro = async (req, res) => {
        try {
            const id = req.params.id;
            await livros.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({ message: "Livro atualizado com sucesso!" });
        } catch (err) {
            res.status(500).send({ message: err.message });            
        }
    };

}

export default LivroController;