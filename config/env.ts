import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
export const ADMIN_URL = process.env.ADMIN_URL || "http://localhost:3000/admin";
export const API_URL = process.env.API_URL || "http://localhost:3000/api";
export const WORKERS = parseInt(process.env.WORKERS || "1", 10);
export const HEADLESS =
  process.env.HEADLESS === undefined ? false : process.env.HEADLESS === "true";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

export default {
  BASE_URL,
  ADMIN_URL,
  API_URL,
  WORKERS,
  HEADLESS,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
};
