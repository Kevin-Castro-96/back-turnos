"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const preloadUsers = [
    {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        birthdate: new Date("1996-05-10"),
        nDni: 12345678,
        credentialsId: 101
    },
    {
        id: 2,
        name: 'María López',
        email: 'maria.lopez@example.com',
        birthdate: new Date("1996-05-10"),
        nDni: 87654321,
        credentialsId: 102
    },
    {
        id: 3,
        name: 'Carlos García',
        email: 'carlos.garcia@example.com',
        birthdate: new Date("1996-05-10"),
        nDni: 23456789,
        credentialsId: 103
    },
    {
        id: 4,
        name: 'Lucía Fernández',
        email: 'lucia.fernandez@example.com',
        birthdate: new Date("1996-05-10"),
        nDni: 34567890,
        credentialsId: 104
    }
];
exports.default = preloadUsers;
