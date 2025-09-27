"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataSource = void 0;
const data_source_1 = require("./data-source");
let appDataSourceInstance = null;
const getDataSource = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!appDataSourceInstance || !appDataSourceInstance.isInitialized) {
        yield data_source_1.AppDataSource.initialize();
        appDataSourceInstance = data_source_1.AppDataSource;
        console.log("📦 DataSource inicializado");
    }
    return appDataSourceInstance;
});
exports.getDataSource = getDataSource;
