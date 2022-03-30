import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Category } from 'src/category/category.model';
export type ArticleDocument = Article & mongoose.Document;

@Schema()
@ObjectType()
export class Article {
    @Field(() => ID)
    _id: number;

    @Prop()
    @Field()
    title: string;

    @Prop()
    @Field()
    content: string;

    @Prop()
    @Field()
    thumbnail: string;

    @Prop()
    categories: string[];

    @Prop()
    author: string[]
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
