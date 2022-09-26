import {config} from "dotenv";
import {DataSource} from "typeorm";
import {User} from "../user/entities/User";
import {Tag} from "../tag/entities/Tag";


config({path: '.env.development'});


export default new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Tag],
    migrations: ['src/database/migrations/*.ts'],
});