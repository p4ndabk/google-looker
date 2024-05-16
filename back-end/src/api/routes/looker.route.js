import { Router } from "express";
import { getDashboardFilters, getQuery } from "../services/looker.service";

const router = Router();

router.post("/data", async (req, res) => {
  const { status, ...rest } = await getQuery({ req });
  res.status(status).send(rest);
});

router.post("/dashboard/filters", async (req, res) => {
  const { status, ...rest } = await getDashboardFilters({ req });
  res.status(status).send(rest);
});

// router.get("/embed", async (req, res) => {
//   const { url } = await getEmbedURL({ req });
//   console.log(url, 'url')
//   res.status(200).send("ok");
// });

export default router;
