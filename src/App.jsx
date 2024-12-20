import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

const App = () => {
  // const cartHook = useState([]);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
