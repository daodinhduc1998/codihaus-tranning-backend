import { Field, ObjectType, ID } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Article } from 'src/article/article.model';

export type CategoryDocument = Category & mongoose.Document;

@Schema()
@ObjectType()
export class Category {
    @Field(() => ID)
    _id: number;

    @Prop({ required: true, unique: true })
    @Field()
    name: string;

    @Prop()
    @Field()
    description: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }] })
    @Field(() => [Article])
    articles: Article[]

}

export const CategorySchema = SchemaFactory.createForClass(Category);