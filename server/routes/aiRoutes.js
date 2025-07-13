import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getSmartReplies, checkSpam, getContextualSuggestion } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.get("/smart-replies/:userId", protectRoute, getSmartReplies);
aiRouter.post("/check-spam", protectRoute, checkSpam);
aiRouter.post("/contextual-suggestion", protectRoute, getContextualSuggestion);

export default aiRouter;