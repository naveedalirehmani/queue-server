import express, { Request, Response } from "express";
import { Queue } from "bullmq";
import { mockSignUp, mockSendEmail } from "./utils/helpers";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT ?? 8000;
dotenv.config();

const emailQueue = new Queue("email-queue", {
  connection: {
    host: process.env.AIVEN_HOST,
    port: parseInt(process.env.AIVEN_PORT as string),
    username: process.env.AIVEN_USERNAME,
    password: process.env.AIVEN_PASSWORD,
  },
});

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "is live!" });
});

app.post("/user-signup", async (request: Request, response: Response) => {
  console.log("in signup...");
  await mockSignUp();

  await emailQueue.add(`${Date.now()}`, {
    from: "dev.naveedrehmani@gmail.com",
    to: "user@gmail.com",
    subject: "signup success",
    body: "this is your email confirmation notice.",
  });

  return response.json({
    status: "success",
    data: { message: "signed up completed!" },
  });
});

app.listen(PORT, () => console.log(`server running on port:${PORT}`));
