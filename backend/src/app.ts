import express from "express";
import config from "config";
import dotenv from "dotenv";
import connectToDB from "./utils/connectToDB";
import log from "./utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";

dotenv.config();
const port = config.get("port");

const app = express();

app.use(express.json());
app.use(deserializeUser);
app.use(router);

app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);
  connectToDB();
});
