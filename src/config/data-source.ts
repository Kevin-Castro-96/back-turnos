import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { userCredential } from "../entities/Credential";
import { Appointment } from "../entities/Turn";
import dotenv from "dotenv";
dotenv.config();
import { config } from "./envs";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: config.DB_SYNC,
  logging: config.DB_LOGG,
  entities: [User, userCredential, Appointment],
  ssl: { rejectUnauthorized: false },
  extra: {
    max: 5,                     // máximo 5 conexiones
    idleTimeoutMillis: 30000,   // desconecta conexiones inactivas
    connectionTimeoutMillis: 10000, // aumenta el timeout a 10s
    keepAlive: true,            // reutiliza conexiones
  },
});
