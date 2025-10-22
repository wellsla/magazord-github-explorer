import { z } from "zod";
import type { AxiosRequestConfig } from "axios";
import http from "./http";

export const getWithSchema = async <S extends z.ZodTypeAny>(
  url: string,
  schema?: S,
  options?: AxiosRequestConfig
): Promise<z.infer<S>> => {
  const response = await http.get(url, options);
  if (schema) {
    return schema.parse(response.data);
  }
  return response.data;
};
