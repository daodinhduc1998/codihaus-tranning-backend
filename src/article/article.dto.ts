
import { Field, InputType, ObjectType, Int, ID, } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Article, ArticleSchema } from '../article/article.model';
import { Category } from 'src/category/category.model';
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested, IsMongoId } from "class-validator";
import { Prop } from '@nestjs/mongoose';
import { ObjectId } from "mongodb";

@InputType()
export class CreateArticleDto {
    @Field({ nullable: false })
    title: string

    @Field({ nullable: false })
    content: string

    @Field({ nullable: true })
    thumbnail: string

    @Field({ nullable: false })
    author: string

    @IsMongoId({ each: true, message: 'must be a ID' })
    @IsArray({ message: 'unit must be array' })
    @ArrayMinSize(1)
    @Field(type => [String], { nullable: true })
    categories: string[]
}

@InputType()
export class UpdateArticleDto {
    @Field({ nullable: true })
    title?: string

    @Field({ nullable: true })
    content?: string

    @Field({ nullable: true })
    thumbnail?: string

    @Field({ nullable: false })
    author: string
}