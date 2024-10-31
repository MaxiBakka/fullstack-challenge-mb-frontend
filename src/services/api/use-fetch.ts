import { useCallback } from "react";
import { FetchInitType, FetchInputType } from "./types/fetch-params";

function useFetch() {
  const fetchWrapper = useCallback(
    async (
      input: FetchInputType,
      init?: FetchInitType,
    ) => {
      let headers: HeadersInit = {};

      if (!(init?.body instanceof FormData)) {
        headers = {
          ...headers,
          "Content-Type": "application/json",
        };
      }

      return fetch(input, {
        ...init,
        headers: {
          ...headers,
          ...init?.headers,
        },
      });
    },
    []
  );

  return fetchWrapper;
}

export default useFetch;
