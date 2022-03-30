import { Module } from '@nestjs/common';
import { ArticlesService } from './article.service';
import { ArticlesResolver } from './article.resolver';
import { UsersService } from '../user/user.service';
import { User, UserSchema } from '../user/user.model';
import { CategoryService } from 'src/category/category.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Article, ArticleSchema } from './article.model';
import { Category, CategorySchema } from 'src/category/category.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Category.name, schema: CategorySchema },
            { name: Article.name, schema: ArticleSchema },
        ]),
    ],
    providers: [
        ArticlesService,
        CategoryService,
        ArticlesResolver,
        UsersService
    ],
})
export class ArticlesModule { }