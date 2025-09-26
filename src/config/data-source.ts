import { DataSource } from "typeorm"
import { User } from "../entities/User";
import { userCredential } from "../entities/Credential";
import { Appointment } from "../entities/Turn";
import dotenv from "dotenv";
dotenv.config();
import { config } from "./envs";

console.log("DB Config:", {
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USERNAME,
  db: config.DB_NAME,
});

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  dropSchema: config.DB_DROPSCHEMA,
  synchronize: config.DB_SYNC,
  logging: config.DB_LOGG,
  entities: [User, userCredential, Appointment],
  subscribers: [],
  migrations: [],
  ssl: { rejectUnauthorized: false },
});

// 👉 Inicializador para Vercel
let initialized = false;

export const initDB = async () => {
  if (!initialized) {
    await AppDataSource.initialize();
    initialized = true;
    console.log("📦 DataSource inicializado");
  }
};
