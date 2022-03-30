import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ArticleReCategoryService } from './ArticleReCategory.service';

import { ArticlesService } from '../article/article.service';
import { Article } from '../article/article.model';
import { CreateArticleDto } from 'src/article/article.dto';

import { CategoryService } from '../category/category.service';
import { Category } from '../category/category.model';

import { ArticleReCategory, ArticleReCategoryDocument } from './ArticleReCategory.model';
import { Param } from '@nestjs/common';



@Resolver(() => ArticleReCategory)
export class ArticleReCategoryResolver {
    constructor(private aRcService: ArticleReCategoryService,
        private articlesService: ArticlesService,
    ) { }

    @Query(() => [ArticleReCategory])
    async filter(@Args('id') id: string, @Args('limit') limit: number, @Args('table') table: string) {
        return this.aRcService.filter2table(id, table, limit)
    }

    @Query(() => Article)
    async createArticleRe(@Args('input') article: CreateArticleDto, @Args('arrIdCategory') arrIdCategory: string[]) {
        return this.aRcService.createArticleRe(article, arrIdCategory);
    }

    //Category => Article
    @ResolveField(() => Article)
    async filterCategory2Article(@Parent() aRc: ArticleReCategory) {
        return this.articlesService.findId(aRc.articles.toString());
    }

}

