import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Threads } from './Threads';

@Entity()
export class Likes {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (users) => users.likes,{ 
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
    user: User;

    @ManyToOne(() => Threads, (thread) => thread.likes,{ 
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    thread: Threads;
}
