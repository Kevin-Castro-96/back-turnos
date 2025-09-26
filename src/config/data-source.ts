import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { userCredential } from "../entities/Credential";
import { Appointment } from "../entities/Turn";
import dotenv from "dotenv";
dotenv.config();
import { config } from "./envs";

// Configuración segura para Vercel serverless + Supabase pooler
export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,       // pooler host de Supabase
  port: config.DB_PORT,       // 6543 si usas pooler
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: config.DB_SYNC,
  logging: config.DB_LOGG,
  entities: [User, userCredential, Appointment],
  ssl: { rejectUnauthorized: false },
  extra: {
    max: 5,                     // máximo 5 conexiones por Lambda
    idleTimeoutMillis: 30000,   // desconectar conexiones inactivas
    connectionTimeoutMillis: 5000, // espera máxima por conexión
    keepAlive: true,            // reutilizar conexiones
  },
});
