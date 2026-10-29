import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.ts";
import { getOverviewSummary } from "../controllers/overview.controller.ts";

const overviewRouter = Router();

overviewRouter.use(protect);

overviewRouter.get("/summary", getOverviewSummary);

export default overviewRouter;
