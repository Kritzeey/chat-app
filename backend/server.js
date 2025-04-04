import express from "express";

const app = express();

app.listen(5000, (req, res) => {
    console.log("http://localhost:5000/")
});