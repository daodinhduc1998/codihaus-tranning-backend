import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './user/user.module';
import { ArticlesModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { ArticleReCategoryModule } from './_ArticleReCategory/ArticleReCategory.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    CategoryModule,
    ArticlesModule,
    //ArticleReCategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
