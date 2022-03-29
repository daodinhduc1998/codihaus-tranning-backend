import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ArticlesService } from './article.service';
import { User } from '../user/user.model';
import { UsersService } from '../user/user.service';
import { Article } from './article.model';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';
import { Param } from '@nestjs/common';

@Resolver(() => Article)
export class ArticlesResolver {
    constructor(private articlesService: ArticlesService, private usersService: UsersService) { }

    @Query(() => [Article])
    async getArticle(@Args('id') id: string) {
        return await this.articlesService.getArticles(id);
    }

    @Mutation(() => Article)
    async createArticle(@Args('input') article: CreateArticleDto) {
        return this.articlesService.createArticle(article);
    }

    @ResolveField(() => User)
    async detail(@Parent() article: Article) {
        return this.usersService.findById(article.author);
    }

}

