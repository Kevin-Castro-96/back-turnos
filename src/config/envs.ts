import "dotenv/config";
import { IConfig } from "../interfaces/configInterface";


export const config: IConfig = {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 8080,
    DB_HOST : process.env.DB_HOST,
    DB_PORT : process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    DB_USERNAME : process.env.DB_USERNAME,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_NAME : process.env.DB_NAME,
    DB_SYNC : process.env.DB_SYNC ? process.env.DB_SYNC === "true": true, 
    DB_DROPSCHEMA : process.env.DB_DROPSCHEMA ? process.env.DB_DROPSCHEMA === "true": true,
    DB_LOGG : process.env.DB_LOGG ? process.env.DB_LOGG === "true": true,
    DB_ENTITIES : process.env.DB_ENTITIES
}