import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Replies } from './Replies';
import { Threads } from './Threads';
import { Likes } from './Likes';
import { Follows } from './Following';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    userName: string;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: "https://via.placeholder.com/200", nullable: true })
    profil_picture: string;

    @Column({ default: "Hai from server", nullable: true })
    profil_description: string;

    @CreateDateColumn({ type: "time with time zone" })
    created_at: Date;

    @UpdateDateColumn({ type: "time with time zone" })
    update_at: Date;
    
    @OneToMany(() => Threads, (thread) => thread.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      threads: Threads[];
    
      @OneToMany(() => Likes, (likes) => likes.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      likes: Likes[];
    
      @OneToMany(() => Follows, (follows) => follows.followed, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      followers: Follows[]
    
      @OneToMany(() => Follows, (follows) => follows.follower, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      following: Follows[]
    
      @OneToMany(() => Replies, (replies) => replies.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      replies: Replies[];
}
