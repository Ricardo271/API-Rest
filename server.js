import * as dotenv from "dotenv";
const result = dotenv.config();
import app from "./src/app.js";

if (result.error) {
    throw result.error;
}
console.log(result.parsed);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`);
});