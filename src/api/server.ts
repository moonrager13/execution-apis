import express from "express";
import { withdrawHandler } from "./withdraw";
import { requireApiKey } from "./securityMiddleware";

const app = express();

app.use(express.json());

app.post("/api/withdraw", requireApiKey, withdrawHandler);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Execution API listening on ${port}`);
});
