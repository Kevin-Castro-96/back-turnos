export interface IConfig {
    PORT: number,
    DB_HOST: string | undefined,
    DB_PORT: number | undefined,
    DB_USERNAME: string | undefined,
    DB_PASSWORD: string | undefined,
    DB_NAME: string | undefined,
    DB_SYNC: boolean | undefined,
    DB_DROPSCHEMA: boolean | undefined,
    DB_LOGG: boolean | undefined,
    DB_ENTITIES: string | undefined,
}