import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthGuard } from './guards/auth.guard';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { PubSub } from 'graphql-subscriptions';
import { TweetModule } from './tweet/tweet.module';

export let pubSub = new PubSub()
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.dev'], isGlobal: true }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN')
        }
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error) => {
        return {
          status: 'error',
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          timestamp: new Date().toISOString(),
        };
      },
    }),
    
    UserModule,
    AuthModule,
    TweetModule,



  ],
  controllers: [],
  providers: [

    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]

})
export class AppModule { }


