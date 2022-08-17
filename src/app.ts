import express from "express";
export const app = express();
import storeRoute from "./routes/stores.route";
// Start the server
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api", storeRoute);
app.listen(3000);
