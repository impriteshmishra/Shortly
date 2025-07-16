import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import AuthPage from "../pages/AuthPage";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: AuthPage
}) 

export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginForm
}) 

export const logoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/signup',
    component: RegisterForm
}) 