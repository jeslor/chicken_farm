import express from "express";
import cors from "cors";
import chickenRoutes from "./routes/chicken.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Chicken Farm API!");
});

app.use("/api/chickens", chickenRoutes);

const PORT = process.env.PORT || 4000 || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
