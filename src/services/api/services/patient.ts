import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { Patient } from "../types/patient";
import { RequestConfigType } from "./types/request-config";


export type PatientPostRequest = Pick<
  Patient,
  "email" | "firstName" | "lastName" | "photo" | "phoneNumber"
>

export type PatientPostResponse = Patient;

export function usePostPatientService() {
  const fetch = useFetch();

  return useCallback(
    (data: PatientPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/patients`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<PatientPostResponse>);
    },
    [fetch]
  );
}