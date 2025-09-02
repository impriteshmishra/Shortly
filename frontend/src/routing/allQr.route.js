import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import { checkAuth, checkNoAccessToPremium } from "../utils/helper";
import ManageQRCode from "../pages/ManageQrCode";



export const allQrRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/allQr',
    component: ManageQRCode,
    beforeLoad: checkNoAccessToPremium
}) 