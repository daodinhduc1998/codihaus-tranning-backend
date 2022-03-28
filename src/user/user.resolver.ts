import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UsersService } from './user.service';
//import { ArticleService } from '../article/article.service';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Param } from '@nestjs/common';
//import { Article } from '../article/article.entity';

@Resolver(() => User)
export class UsersResolver {
    constructor(private usersService: UsersService,
        //private articleService: ArticleService,
    ) { }

    @Query(() => [User])
    async getUser(@Args('id') id: string) {
        return await this.usersService.getUsers(id);
    }

    @Mutation(() => User)
    async createUser(@Args('input') user: CreateUserDto) {
        return this.usersService.createUser(user);
    }

}

