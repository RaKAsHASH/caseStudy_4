const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authroute = require("./routes/authroutes");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose
  .connect(
    "mongodb+srv://rkashash:12345678hr@cluster0.kki977h.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));
app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
authroute(app);
