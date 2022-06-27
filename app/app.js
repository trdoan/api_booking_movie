const { app, express } = require("../server");
const cors = require("cors");
const rootRouter = require("./routers/root.router");
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json());

app.use(cors());

app.use("/", rootRouter);
app.use((err, req, res, next) => {
  res.status(err.status);
  res.send({ statusCode: err.status, message: err.message });
});
