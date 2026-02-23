import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/connectDb.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.route.js";
import pdfRouter from "./routes/pdf.route.js";
import creditRouter from "./routes/credits.route.js";
import { stripeWebhook } from "./controllers/credits.controller.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.post(
  "/api/credits/webhook",
  express.raw({type: "application/json"}),
  stripeWebhook
)

app.use(
  cors({
    origin: "https://examnotesaiclient-rekp.onrender.com",
    credentials: true,
    methods: ["GET", "PUT", "DELETE", "OPTIONS"]
  }),
);

app.use((req, res, next) => {
  res.header("Strict-Transport-Security", "max-age=0"); // Disable HSTS locally
  next();
});

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json({ message: "ExamNotes AI backend running 🚀" });
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter)
app.use("/api/notes", notesRouter)
app.use("/api/pdf", pdfRouter)
app.use("/api/credit", creditRouter)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
  connectDb();
});
