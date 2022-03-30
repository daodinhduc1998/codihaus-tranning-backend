import { Module } from '@nestjs/common';
import { ArticleReCategoryService } from './ArticleReCategory.service';
import { ArticleReCategoryResolver } from './ArticleReCategory.resolver';

import { MongooseModule } from '@nestjs/mongoose';
import { ArticleReCategory, ArticleReCategorySchema } from './ArticleReCategory.model';
import { Article, ArticleSchema } from 'src/article/article.model';
import { Category, CategorySchema } from 'src/category/category.model';
import { User, UserSchema } from 'src/user/user.model';
import { ArticlesService } from 'src/article/article.service';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ArticleReCategory.name, schema: ArticleReCategorySchema },
            { name: Article.name, schema: ArticleSchema },
            { name: Category.name, schema: CategorySchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    providers: [
        ArticleReCategoryService,
        ArticleReCategoryResolver,
        ArticlesService
    ],
})
export class ArticleReCategoryModule { }