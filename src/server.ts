import express from 'express';
import morgan from "morgan"
import indexRouter from './routes/indexRouter';
import cors from "cors";

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
//aqui se usa router importado desde routes para enviarlo a index.ts
server.use(indexRouter);


export default server; 