import { validateEnvVar } from "./validators";

export const ALL_POSTS_URL =
  validateEnvVar(process.env.NEXT_PUBLIC_BASE_API) + "/v2/everything";
export const TOP_HEADLINES_URL =
  validateEnvVar(process.env.NEXT_PUBLIC_BASE_API) + "/v2/top-headlines";
