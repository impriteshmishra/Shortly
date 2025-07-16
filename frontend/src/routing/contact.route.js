import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import ContactPage from "../pages/ContactPage";

export const ContactRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/contact',
    component: ContactPage
}) 