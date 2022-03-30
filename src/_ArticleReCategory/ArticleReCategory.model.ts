import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

import { Category } from '../category/category.model';
import { Article } from 'src/article/article.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ArticleReCategoryDocument = ArticleReCategory & mongoose.Document;

@Schema()
@ObjectType()
export class ArticleReCategory {
    @Field(() => ID)
    _id: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    @Field(() => Category)
    categories: Category

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' })
    @Field(() => Article)
    articles: Article

}

export const ArticleReCategorySchema = SchemaFactory.createForClass(ArticleReCategory).index({ categories: 1, articles: 1 }, { unique: true });
