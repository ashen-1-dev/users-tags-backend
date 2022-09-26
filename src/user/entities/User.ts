import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Tag} from "../../tag/entities/Tag";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public uuid: string;

    @Column({ length: 30, unique: true})
    public nickname: string;

    @Column({length: 100, unique: true})
    public email: string;

    @Column({length: 100})
    public password: string;

    @ManyToMany(() => Tag, tag => tag.users, {cascade: true})
    public tags: Tag[];

    @OneToMany(() => Tag, tag => tag.creator, {onDelete: 'CASCADE', nullable: true})
    public authoredTags: Tag[];

    @Column({nullable: true})
    public refreshToken: string
}