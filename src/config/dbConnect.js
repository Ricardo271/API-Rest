import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/alura-node", {
    authSource: "admin",
    user: "root",
    pass: "pass",
    useNewUrlParser: true
});

let db = mongoose.connection;

export default db;