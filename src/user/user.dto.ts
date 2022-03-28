
import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import * as mongoose from 'mongoose';
import { Article, ArticleSchema } from '../article/article.model';

@InputType()
export class CreateUserDto {
    @Field({ nullable: false })
    username: string

    @Field({ nullable: false })
    password: string

    @IsEmail()
    @Field({ nullable: false })
    email: string

    @Field({ nullable: true })
    name?: string

}

@InputType()
export class UpdateUserDto {
    @Field({ nullable: false })
    username: string

    @Field({ nullable: true })
    password?: string

    @IsEmail()
    @Field({ nullable: true })
    email?: string

    @Field({ nullable: true })
    name?: string
}