import express from "express";
export const app = express();
import storeRoute from "./routes/stores.route";
import * as dotenv from "dotenv";
import { init } from "./init/init";
dotenv.config({ path: __dirname + "/.env" });
init();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api", storeRoute);
app.listen(3000);
console.log("🚀🚀🚀 server in 3000");
