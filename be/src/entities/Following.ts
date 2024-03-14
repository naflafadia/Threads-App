import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Follows {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.followers, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    followed: User;

    @ManyToOne(() => User, (user) => user.following, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    follower: User;
}
