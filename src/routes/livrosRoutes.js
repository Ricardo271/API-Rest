import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
    .get("/livros", LivroController.listar_livros, paginar)
    .get("/livros/busca", LivroController.listar_livros_por_filtro, paginar)
    .get("/livros/:id", LivroController.listar_livro_por_id)
    .post("/livros", LivroController.cadastrar_livro)
    .put("/livros/:id", LivroController.atualizar_livro)
    .delete("/livros/:id", LivroController.excluir_livro);

export default router;
