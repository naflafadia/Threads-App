import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Following {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.followings)
    follower: User;

    @ManyToOne(() => User, user => user.followings)
    following: User;

    @Column({ type: 'date' })
    created_at: Date;

    @Column()
    created_by: number;

    @Column({ type: 'date' })
    updated_at: Date;

    @Column()
    updated_by: number;
}
