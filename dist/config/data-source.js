"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Credential_1 = require("../entities/Credential");
const Turn_1 = require("../entities/Turn");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envs_1 = require("./envs");
// Configuración segura para Vercel serverless + Supabase pooler
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.config.DB_HOST, // pooler host de Supabase
    port: envs_1.config.DB_PORT, // 6543 si usas pooler
    username: envs_1.config.DB_USERNAME,
    password: envs_1.config.DB_PASSWORD,
    database: envs_1.config.DB_NAME,
    synchronize: envs_1.config.DB_SYNC,
    logging: envs_1.config.DB_LOGG,
    entities: [User_1.User, Credential_1.userCredential, Turn_1.Appointment],
    ssl: { rejectUnauthorized: false },
    extra: {
        max: 5, // máximo 5 conexiones por Lambda
        idleTimeoutMillis: 30000, // desconectar conexiones inactivas
        connectionTimeoutMillis: 5000, // espera máxima por conexión
        keepAlive: true, // reutilizar conexiones
    },
});
