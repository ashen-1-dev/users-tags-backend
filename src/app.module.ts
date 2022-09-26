import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserModule} from "./user";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TagModule} from "./tag";
import {Module} from "@nestjs/common";
import {User} from "./user/entities/User";
import {Tag} from "./tag/entities/Tag";
import {AuthModule} from "./auth";


@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.env.${process.env.NODE_ENV}`,
          isGlobal: true,
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
              return {
                  type: "postgres",
                  host: configService.get('POSTGRES_HOST'),
                  port: +configService.get<number>('POSTGRES_PORT'),
                  username: configService.get('POSTGRES_USER'),
                  password: configService.get('POSTGRES_PASSWORD'),
                  database: configService.get('POSTGRES_DB'),
                  entities: [
                      User,
                      Tag,
                  ],
                  synchronize: true,
              }
          },
      }),
      AuthModule,
      UserModule,
      TagModule,
  ],
  providers: [],
})
export class AppModule {}