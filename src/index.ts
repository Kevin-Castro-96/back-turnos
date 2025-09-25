import server from "./server";
import { config } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

const initializeApp = async ()=>{
  await AppDataSource.initialize();
  server.listen(config.PORT, ()=>{
      console.log(`Servidor escuchando en el puerto ${config.PORT}`)
  })
}

initializeApp();
