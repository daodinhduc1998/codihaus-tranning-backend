import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { User } from '../user/user.model';
import { Category } from '../category/category.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    @Field(() => User)
    author: User | string
}

export const ArticleSchema = SchemaFactory.createForClass(Article);