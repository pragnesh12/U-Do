import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { json } from "body-parser";
import userRoutes from "./Routes/UserRoutes";
import todoRoutes from "./Routes/TodoRoutes";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.189.237:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"],
  })
);

app.use(json());
app.use("/api/v1", userRoutes);
app.use("/api/v1", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server Running Successfully On PORT : `, PORT);
});
