import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import AnalyticsDashboard from "../pages/AnalyticsDashboard";
import { checkAuth } from "../utils/helper";



export const analyticsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/analytics',
    component: AnalyticsDashboard,
     beforeLoad: checkAuth
}) 