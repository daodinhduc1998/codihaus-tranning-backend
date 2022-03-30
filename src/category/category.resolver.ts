import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { ArticlesService } from '../article/article.service';
import { Category } from './category.model';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { Param } from '@nestjs/common';
import { Article } from 'src/article/article.model';

@Resolver(() => Category)
export class CategoryResolver {
    constructor(private categoryService: CategoryService,
        private articleService: ArticlesService
    ) { }

    @Query(() => [Category])
    async getCategory(@Args('id') id: string, @Args('limit') limit: number) {
        if (id)
            return this.categoryService.findId(id)
        else {
            if (limit > 0)
                return this.categoryService.findLimit(limit);
            else
                return []
        }
    }

    @Mutation(() => Category)
    async createCategory(@Args('input') category: CreateCategoryDto) {
        return this.categoryService.createCategory(category);
    }

    @ResolveField(() => [Article])
    async articleList(@Parent() category: Category) {
        return this.articleService.findAll(category.articles);
    }

}

