const express = require("express");
const path = require("path");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const http = require("http");

const port = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Set-Cookie,Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

const colonyRoutes = require("./src/routes/colony.routes");
const plotRoutes = require("./src/routes/plot.routes");

// All end points
app.use(express.static(path.join(__dirname, "uploads")));

const adapter = new FileAsync("db.json");
low(adapter).then((db) => {
  app.use("/api/colonies", colonyRoutes);
  app.use("/api/plots", plotRoutes);

  // Handling errors
  app.use((req, res, next) => {
    const error = new Error("Not found!");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

  db.defaults({ colonies: [] }).write();
  db.defaults({ plots: [] }).write();

  const server = http.createServer(app);
  server.listen(port);
});

module.exports = app;
