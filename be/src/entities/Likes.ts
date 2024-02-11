import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Threads } from './Threads';

@Entity()
export class Likes {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.likes)
    user: User;

    @ManyToOne(() => Threads, threads => threads.likes)
    threads: Threads;

    @Column({ type: 'date' })
    created_at: Date;

    @Column()
    created_by: number;

    @Column({ type: 'date' })
    updated_at: Date;

    @Column()
    updated_by: number;
}
