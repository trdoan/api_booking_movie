const express = require("express");
const app = express();
const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app, express };
