require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { connectToDatabase } = require("./utils/db");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const animalsRouter = require("./routes/animals");
const stagesRouter = require("./routes/stages");
const roundToShowsRouter = require("./routes/roundToShows");
const ordersRouter = require("./routes/orders");

connectToDatabase();

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/animals", animalsRouter);
app.use("/stages", stagesRouter);
app.use("/round_to_shows", roundToShowsRouter);
app.use("/orders", ordersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // res.status(err.status || 500);
  res.json({ ok: false, message: err.message });
});

var port = process.env.PORT || "8000";
app.set("port", port);
app.listen(port, () => {
  console.log("Server running on port: ", port);
});

// module.exports = app;
