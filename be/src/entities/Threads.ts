import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './User';
import { Replies } from './Replies';
import { Likes } from './Likes';

@Entity()
export class Threads {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: "timestamp" })
  postedAt: Date;

  @ManyToOne(() => User, (user) => user.threads, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  user: User;

  @OneToMany(() => Likes, (likes) => likes.thread, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  likes: Likes[];

  @OneToMany(() => Replies, (replies) => replies.thread, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  replies: Replies[];
}
