const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

// Función para leer el archivo
function readFile(filePath, callback) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error leyendo el archivo:", err);
      callback(err, null);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (error) {
      console.error("Error parseando el JSON:", error);
      callback(error, null);
    }
  });
}

app.get("/", (req, res) => {
  readFile('./db/emotion.txt', (error, jsonData) => {
    if (error) {
      console.error("Hubo un error:", error);
      res.status(500).send("Hubo un error al leer el archivo.");
      return;
    }
    // Si no hay error, envía los datos leídos como JSON
    res.json(jsonData);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

