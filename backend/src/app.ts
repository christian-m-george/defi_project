import express from "express";
import config from "config";
import dotenv from "dotenv";
import connectToDB from "./utils/connectToDB";
import log from "./utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import cors from 'cors';

dotenv.config();
const port = config.get("port");
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

const app = express();

app.use(cors(options))
app.use(express.json());
app.use(deserializeUser);
app.use(router);

app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);
  connectToDB();
});
