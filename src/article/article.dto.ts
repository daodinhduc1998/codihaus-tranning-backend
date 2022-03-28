
import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Article, ArticleSchema } from '../article/article.model';

@InputType()
export class CreateArticleDto {
    @Field({ nullable: false })
    title: string

    @Field({ nullable: false })
    content: string

    @Field({ nullable: true })
    thumbnail: string

    @Field({ nullable: false })
    author: mongoose.Types.ObjectId

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
    author: mongoose.Types.ObjectId
}