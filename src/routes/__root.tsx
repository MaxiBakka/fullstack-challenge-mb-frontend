import '../index.css'
import '../App.css'

import QueryClientProvider from "../services/react-query/query-client-provider";
import queryClient from "../services/react-query/query-client";
import ReactQueryDevtools from "../services/react-query/react-query-devtools";
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div className='p-2 flex gap-2'>
          <Link to='/' className='[&.active]:text-orange-500'>
            Patients
          </Link>{' '}
          <Link to='/add-patient' className='[&.active]:text-orange-500'>
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
    )
  },
})
