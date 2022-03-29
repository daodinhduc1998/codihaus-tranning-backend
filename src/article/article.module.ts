import { Module } from '@nestjs/common';
import { ArticlesService } from './article.service';
import { ArticlesResolver } from './article.resolver';
import { UsersService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.model';
import { Article, ArticleSchema } from './article.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Article.name, schema: ArticleSchema },
        ]),
    ],
    providers: [
        ArticlesService,
        ArticlesResolver,
        UsersService
    ],
})
export class ArticlesModule { }