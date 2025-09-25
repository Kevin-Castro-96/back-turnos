import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from './User';
  
  @Entity('appointments')
  export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'date' })
    date: Date;
  
    @Column({ type: 'time' })
    time: string;

    @Column({type: "varchar"})
    description: string;
  
    @Column({ type: 'varchar', length: 50 })
    status: string;
  
    @ManyToOne(() => User, user => user.appointments, {
      onDelete: 'CASCADE',
      eager: true
    })
    @JoinColumn({ name: 'userId' }) // FK en la tabla appointments
    user: User;
  }
  