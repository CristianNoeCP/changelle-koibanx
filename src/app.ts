import express from "express";
export const app = express();
import storeRoute from "./routes/stores.route";
import dotenv from "dotenv";

dotenv.config();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api", storeRoute);
app.listen(3000);
console.log("🚀🚀🚀 server in 3000");
