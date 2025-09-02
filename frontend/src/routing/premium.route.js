import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import Premium from "../pages/Premium";
import { checkPremium } from "../utils/helper";


export const premiumRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/premium',
    component: Premium,
    beforeLoad: checkPremium
}) 