import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Replies } from './Replies';
import { Threads } from './Threads';
import { Likes } from './Likes';
import { Following } from './Following';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    photo_profile: string;

    @Column()
    bio: string;

    @Column({ type: 'date' })
    created_at: Date;

    @Column()
    created_by: number;

    @Column({ type: 'date' })
    updated_at: Date;

    @Column()
    updated_by: number;

    @OneToMany(() => Replies, replies => replies.user)
    replies: Replies[];

    @OneToMany(() => Threads, thread => thread.user)
    threads: Threads[];

    @OneToMany(() => Likes, likes => likes.user)
    likes: Likes[];

    @OneToMany(() => Following, following => following.follower)
    followings: Following[];
}
