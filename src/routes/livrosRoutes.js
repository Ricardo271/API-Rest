import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
    .get("/livros", LivroController.listar_livros)
    .get("/livros/busca", LivroController.listar_livros_por_filtro)
    .get("/livros/:id", LivroController.listar_livro_por_id)
    .post("/livros", LivroController.cadastrar_livro)
    .put("/livros/:id", LivroController.atualizar_livro)
    .delete("/livros/:id", LivroController.excluir_livro);

export default router;
