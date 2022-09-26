import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/User";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({length: 40, unique: true})
    public name: string;

    @Column({default: 0})
    public sortOrder: number;

    @ManyToMany(() => User, user => user.tags)
    @JoinTable()
    public users: User[];

    @ManyToOne(() => User, (user) => user.authoredTags, {cascade: true})
    public creator: User;
}