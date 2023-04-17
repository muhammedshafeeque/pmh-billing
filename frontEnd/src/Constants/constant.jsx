import { nav } from "./routes";

export const BASE_URL = "http://localhost:5000/api/";
export const TOKEN = "token";
export const MODULES = [
  { code: "DSH", navigate: nav.DASHBOARD, name: "HOME" },
  { code: "STOCK", navigate: nav.STOCK, name: "STOCK" },
];
