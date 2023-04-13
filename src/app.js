import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipulador_de_erros from "./middlewares/manipuladorDeErros.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
    console.log("Acesse o mongo express em http://localhost:8081");
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipulador_de_erros);


export default app;