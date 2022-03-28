import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ArticlesService } from './article.service';
//import { ArticleService } from '../article/article.service';
import { Article } from './article.model';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';
import { Param } from '@nestjs/common';
//import { Article } from '../article/article.entity';

@Resolver(() => Article)
export class UsersResolver {
    constructor(private articlesService: ArticlesService,
        //private articleService: ArticleService,
    ) { }

    @Query(() => [Article])
    async getUser(@Args('title') title: string) {
        return await this.articlesService.getArticles(title);
    }

    @Mutation(() => Article)
    async createUser(@Args('input') article: CreateArticleDto) {
        return this.articlesService.createArticle(article);
    }

}

