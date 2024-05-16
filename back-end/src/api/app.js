import cors from "cors";
import express, { json } from "express";

// routes
import Looker from "./routes/looker.route";
import Login from "./routes/login.route";

// middlewares
import AuthenticationMiddleware from "./middleware/authentication.middleware";
import DefaultResponses from "./utils/responses";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(json());

app.get("/", (_, res) => {
  res.send("API is running...");
});

app.get("/ping", (_, res) => {
  res.send(DefaultResponses.OK);
});

app.use("/login", Login);

app.use(AuthenticationMiddleware);


app.use("/looker", Looker);

export default app;
