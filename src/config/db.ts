import { AppDataSource } from "./data-source";

let appDataSourceInstance: typeof AppDataSource | null = null;

export const getDataSource = async () => {
  if (!appDataSourceInstance || !appDataSourceInstance.isInitialized) {
    await AppDataSource.initialize();
    appDataSourceInstance = AppDataSource;
    console.log("📦 DataSource inicializado en Vercel");
  }
  return appDataSourceInstance;
};
