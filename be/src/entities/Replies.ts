import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Threads } from './Threads';

@Entity()
export class Replies {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.replies)
    user: User;

    @ManyToOne(() => Threads, threads => threads.replies)
    threads: Threads;

    @Column()
    image: string;

    @Column()
    content: string;

    @Column({ type: 'date' })
    created_at: Date;

    @Column()
    created_by: number;

    @Column({ type: 'date' })
    updated_at: Date;

    @Column()
    updated_by: number;
}
