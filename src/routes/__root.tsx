import "../index.css";
import "../App.css";

import QueryClientProvider from "../services/react-query/query-client-provider";
import queryClient from "../services/react-query/query-client";
import ReactQueryDevtools from "../services/react-query/react-query-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div className="p-2 flex gap-2 min-w-[1000px] *:min-w-[130px]">
          <Link
            to="/"
            className="[&.active]:text-blue-800 [&.active]:font-bold text-xl"
          >
            Patients
          </Link>{" "}
          <Link
            to="/add-patient"
            className="[&.active]:text-blue-800 [&.active]:font-bold text-xl"
          >
            Add Patient
          </Link>
        </div>
        <hr />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Outlet />
        </QueryClientProvider>
        <TanStackRouterDevtools />
      </>
    );
  },
});
