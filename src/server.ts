import * as express from "express";
import * as path from "path";

const app = express();

app.use("/", express.static("dist/public"));

app.listen(3000);
