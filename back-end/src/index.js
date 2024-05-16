import { config } from "dotenv";
import app from "./api/app";

config();

const port = process.env.PORT || "3001";

app.listen(port, "0.0.0.0", () => {
  console.log(`app listening on port ${port}`);
});
