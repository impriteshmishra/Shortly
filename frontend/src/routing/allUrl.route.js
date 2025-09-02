import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import { checkAuth } from "../utils/helper";
import ManageQRCode from "../pages/ManageQrCode";
import ManageUrl from "../pages/ManageUrl";



export const allUrlRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/allUrls',
    component: ManageUrl,
    beforeLoad: checkAuth
}) 