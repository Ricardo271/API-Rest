import express from "express";
import AutorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
    .get("/autores", AutorController.listar_autores, paginar)
    .get("/autores/:id", AutorController.listar_autor_por_id)
    .post("/autores", AutorController.cadastrar_autor)
    .put("/autores/:id", AutorController.atualizar_autor)
    .delete("/autores/:id", AutorController.excluir_autor);

export default router;
