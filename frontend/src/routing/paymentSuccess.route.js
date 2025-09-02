import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import PaymentSuccess from "../pages/PaymentSuccess";
import {checkPremium} from "../utils/helper";


export const PaymentSuccessRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/payment-success',
    component: PaymentSuccess,
    beforeLoad: checkPremium
}) 