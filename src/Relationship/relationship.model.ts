import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

import { Category } from '../category/category.model';
import { Article } from 'src/article/article.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RelationshipDocument = Relationship & mongoose.Document;

@Schema()
@ObjectType()
export class Relationship {
    @Field(() => ID)
    _id: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
    @Field(() => [Category])
    categories: [Category];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }] })
    @Field(() => [Article])
    articles: [Article]

}

export const RelationshipSchema = SchemaFactory.createForClass(Relationship);