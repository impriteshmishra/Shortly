import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login, logout } from "../store/slice/authSlice.js";

export const checkAuth = async ({ context }) => {
  const { queryClient, store } = context;

  try {
    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });

    if (!user) {
      store.dispatch(logout()); 
      return redirect({ to: "/auth" });
    }

    store.dispatch(login(user));

    const { isAuthenticated } = store.getState().auth;

    if (!isAuthenticated) {
      store.dispatch(logout());
      return redirect({ to: "/auth" });
    }

    return true;
  } catch (error) {
    console.log("Auth check failed:", error.message);
    store.dispatch(logout()); 
    return redirect({ to: "/auth" });
  }
};
