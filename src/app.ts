import express from "express";
export const app = express();
// Start the server
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.listen(3000);

console.log("todo nice");
