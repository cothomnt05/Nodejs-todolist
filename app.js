const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const mongoClient = require("mongoose");
const cors = require("cors");

//connect mongodb
mongoClient
  .connect(
    "mongodb+srv://cothomnt:cothomnt05@todolist.hsqhxa7.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected database from mongodb"))
  .catch((error) =>
    console.error(`Connect database is failed with error which is ${error} `)
  );

const app = express();

app.use(cors());

const itemRoute = require("./routers/item");
const listRoute = require("./routers/list");

//middlewares
app.use(logger("dev"));
app.use(bodyParser.json());

//routers
app.use("/api/items", itemRoute);
app.use("/api/lists", listRoute);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Server is OK!",
  });
});

//cactch 404
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// error handle function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

//start server
const port = app.get("port") || 8000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
