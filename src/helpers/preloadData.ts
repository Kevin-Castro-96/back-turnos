import IUser from "../interfaces/Iuser";


const preloadUsers: IUser[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    birthdate: '1990-04-12',
    nDni: 12345678,
    credentialsId: 101
  },
  {
    id: 2,
    name: 'María López',
    email: 'maria.lopez@example.com',
    birthdate: '1985-09-23',
    nDni: 87654321,
    credentialsId: 102
  },
  {
    id: 3,
    name: 'Carlos García',
    email: 'carlos.garcia@example.com',
    birthdate: '1992-01-15',
    nDni: 23456789,
    credentialsId: 103
  },
  {
    id: 4,
    name: 'Lucía Fernández',
    email: 'lucia.fernandez@example.com',
    birthdate: '1995-06-08',
    nDni: 34567890,
    credentialsId: 104
  }
];

export default preloadUsers;
