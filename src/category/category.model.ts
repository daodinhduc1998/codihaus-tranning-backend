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
}

export const CategorySchema = SchemaFactory.createForClass(Category);