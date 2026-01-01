// backend server.js
import express from "express";
import cors from "cors";
import { router } from "./routers/userRouters.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://deploy-practice-97c63.web.app", // Firebase frontend
      "http://localhost:5173", // Local dev
    ],
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/users", router);

const PORT = process.env.VITE_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
