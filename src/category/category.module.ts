import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './category.model';
import { Article, ArticleSchema } from 'src/article/article.model';
import { ArticlesService } from 'src/article/article.service';
import { UsersService } from '../user/user.service';
import { User, UserSchema } from '../user/user.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
            { name: User.name, schema: UserSchema },
            { name: Article.name, schema: ArticleSchema },
        ]),
    ],
    providers: [
        CategoryService,
        ArticlesService,
        CategoryResolver,
    ],
})
export class CategoryModule { }