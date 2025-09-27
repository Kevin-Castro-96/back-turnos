"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const turnosRouter_1 = __importDefault(require("./turnosRouter"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
const express_1 = require("express");
const indexRouter = (0, express_1.Router)();
indexRouter.use("/users", usersRouter_1.default);
indexRouter.use("/appointments", turnosRouter_1.default);
indexRouter.use("/", (req, res) => {
    res.send("🚀 Bienvenido a mi backend, la API está corriendo correctamente!");
});
exports.default = indexRouter;
