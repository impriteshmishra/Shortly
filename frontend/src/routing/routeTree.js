import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../App";
import { homePageRoute } from "./homepage.route";
import { authRoute, loginRoute, logoutRoute, profileRoute } from "./auth.route";
import { dashboardRoute } from "./dashboard.route";
import { ContactRoute } from "./contact.route";
import { aboutRoute } from "./about.route";
import { analyticsRoute } from "./analytics.route";
import { premiumRoute } from "./premium.route";
import { PaymentSuccessRoute } from "./paymentSuccess.route";


export const rootRoute = createRootRoute({
    component: RootLayout
})

export const routeTree = rootRoute.addChildren([homePageRoute, authRoute, dashboardRoute, ContactRoute, aboutRoute, loginRoute, logoutRoute, profileRoute, analyticsRoute, premiumRoute,PaymentSuccessRoute]); 