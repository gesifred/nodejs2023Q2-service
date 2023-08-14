import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { UserInterface } from '../interfaces/user.interfaces';

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ length: 100 })
  login: string;

  @Column({ length: 50, select: false })
  password?: string;

  //@Column()
  @VersionColumn()
  version: number; // integer number, increments on update

  @CreateDateColumn()
  createdAt: Date; // timestamp of creation

  @UpdateDateColumn()
  updatedAt: Date; // timestamp of last update
}
