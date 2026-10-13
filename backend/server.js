import express from "express";
import cors from "cors";
import { questionsRouter } from "./questions.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/react", questionsRouter);

app.use((error, req, res, next) => {
  console.error(req.method, req.path, error);
  if (res.headersSent) return next(error);
  res.status(500).json({ message: "Database error" });
});

const PORT = process.env.PORT || 8801;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
