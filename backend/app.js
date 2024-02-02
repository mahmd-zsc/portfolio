let express = require("express");
let app = express();
let dotenv = require("dotenv");
dotenv.config({ path: ".env" });
let { connectDB } = require("./config/conactDB");

connectDB();
app.use(express.json());
app.use("/api/skills", require("./routes/skills"));

app.listen(8000, () => {
  console.log("app is running...");
});
