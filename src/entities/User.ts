import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { userCredential } from "./Credential";
import { Appointment } from "./Turn";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 150, unique: true })
  email: string;

  @Column({ type: "date" })
  birthdate: Date;

  @Column({ type: "int", unique: true })
  nDni: number;
  @Column({ type: "int", unique: true })
  credentialsId: number;

  @OneToOne(() => userCredential, (credential) => credential.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: "credentialsId" }) // esta columna hace el JOIN real
  credential: userCredential;
  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
