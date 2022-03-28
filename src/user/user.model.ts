

import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Article } from '../article/article.model';


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
@ObjectType()
export class User {
    @Field(() => ID)
    _id: number;

    @Prop({ required: true, unique: true })
    @Field()
    username: string;

    @Prop({ required: true })
    @Field()
    password: string;

    @Prop({ required: true })
    @Field()
    email: string;

    @Prop()
    @Field()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article', unique: true })
    @Field(() => [Article])
    articles: Article[]
}

export const UserSchema = SchemaFactory.createForClass(User);