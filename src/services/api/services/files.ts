import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { FileEntity } from "../types/file-entity";
import { RequestConfigType } from "./types/request-config";

export type FileUploadRequest = File;

export type FileUploadResponse = {
  file: FileEntity;
};

export function useFileUploadService() {
  const fetchClient = useFetch();

  return useCallback(
    async (data: FileUploadRequest, requestConfig?: RequestConfigType) => {
      const formData = new FormData();
      formData.append("file", data);
      console.log(import.meta.env.BASE_URL);
      console.log(import.meta.env.VITE_API_BASE_URL)
      const response = await fetchClient(`${API_URL}/v1/files/upload`, {
        method: "POST",
        body: formData,
        ...requestConfig,
      })
      return wrapperFetchJsonResponse<FileUploadResponse>(response);
    },
    [fetchClient]
  );
}
