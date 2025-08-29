import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import AuthPage from "../pages/AuthPage";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ProfilePage from '../pages/ProfilePage';
import { checkAuth } from "../utils/helper";

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

export const profileRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/profile',
    component: ProfilePage,
    beforeLoad: checkAuth
})