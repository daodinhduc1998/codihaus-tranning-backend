import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { ArticlesService } from '../article/article.service';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Param } from '@nestjs/common';
import { Article } from '../article/article.model';

@Resolver(() => User)
export class UsersResolver {
    constructor(private usersService: UsersService, private articleService: ArticlesService) { }

    @Query(() => [User])
    async getUser(@Args('id') id: string, @Args('limit') limit: number) {
        if (id)
            return this.usersService.findId(id)
        else {
            if (limit > 0)
                return this.usersService.findLimit(limit);
            else
                return []
        }
    }

    @Mutation(() => User)
    async createUser(@Args('input') user: CreateUserDto) {
        return this.usersService.createUser(user);
    }

    @ResolveField(() => [Article])
    async articleDetail(@Parent() user: User) {
        return this.articleService.findListArticlebyUser(user._id.toString());
    }

}

