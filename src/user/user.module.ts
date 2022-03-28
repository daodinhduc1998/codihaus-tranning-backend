import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersResolver } from './user.resolver';
import { ArticlesService } from '../article/article.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { Article, ArticleSchema } from '../article/article.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Article.name, schema: ArticleSchema },
        ]),
    ],
    providers: [
        UsersService,
        UsersResolver,
        ArticlesService
    ],
})
export class UsersModule { }