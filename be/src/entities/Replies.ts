import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Threads } from './Threads';

@Entity()
export class Replies {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    content: string;

    @Column({nullable: true})
    image: string;
  
    @ManyToOne(() => User, user => user.replies, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    user: User;
  
    @ManyToOne(() => Threads, thread => thread.replies, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    thread: Threads;
}
