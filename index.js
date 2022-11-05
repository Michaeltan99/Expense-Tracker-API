const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = 8001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    status: true,
    message: "Welcome to API Todo List and Express",
  });
});

routes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost/${port}`);
});
