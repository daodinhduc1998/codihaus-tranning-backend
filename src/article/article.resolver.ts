import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ArticlesService } from './article.service';
import { User } from '../user/user.model';
import { UsersService } from '../user/user.service';
import { Article } from './article.model';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';
import { Param } from '@nestjs/common';
import { Category } from 'src/category/category.model';
import { CategoryService } from 'src/category/category.service';

@Resolver(() => Article)
export class ArticlesResolver {
    constructor(private articlesService: ArticlesService,
        private usersService: UsersService,
        private categoryService: CategoryService,

    ) { }

    @Query(() => [Article])
    async getArticle(@Args('id') id: string, @Args('limit') limit: number) {
        if (id)
            return this.articlesService.findId(id)
        else {
            if (limit > 0)
                return this.articlesService.findLimit(limit)
            else
                return []
        }
    }

    @Mutation(() => Article)
    async createArticle(@Args('input') article: CreateArticleDto,) {
        return this.articlesService.createArticleR(article);
    }

    @ResolveField(() => User)
    async author(@Parent() article: Article) {
        return this.usersService.findOneId(article.author.toString());
    }

    @ResolveField(() => [Category])
    async category(@Parent() article: Article) {
        return this.categoryService.findAll(article.categories);
    }

}

