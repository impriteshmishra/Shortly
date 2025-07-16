import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routing/routeTree.js";
import { store, persistor } from './store/store.js'; // <-- updated import
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // <-- NEW

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    store
  }
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
