const { app, express } = require("../server");
const cors = require("cors");
const rootRouter = require("./routers/root.router");
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json());

app.use(cors());

app.use("/", rootRouter);
app.use("*", (req, res, next) => {
  res.status(404);
  res.send({
    statusCode: 404,
    message: "Liên kết không tồn tại",
    docs: "https://docs.google.com/spreadsheets/d/1-0jeexlI3Pt3OEgeK8d3tFPuvFS1P1mlOETp6B4sESU/edit#gid=689460139",
  });
});
// format error respone
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    statusCode: err.status,
    message: err.message,
    docs: "https://docs.google.com/spreadsheets/d/1-0jeexlI3Pt3OEgeK8d3tFPuvFS1P1mlOETp6B4sESU/edit#gid=689460139",
  });
});
