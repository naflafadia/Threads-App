import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './User';
import { Replies } from './Replies';
import { Likes } from './Likes';

@Entity()
export class Threads {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.threads)
    user: User;

    @OneToMany(() => Replies, replies => replies.threads)
    replies: Replies[];

    @OneToMany(() => Likes, likes => likes.threads)
    likes: Likes[];

    @Column()
    content: string;

    @Column({ nullable: true })
    image: string;

    @Column()
    number_of_replies: number;

    @Column({ type: 'date' })
    created_at: Date;

    @Column()
    created_by: number;

    @Column({ type: 'date' })
    updated_at: Date;

    @Column()
    updated_by: number;
}
