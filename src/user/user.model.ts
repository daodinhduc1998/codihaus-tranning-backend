

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';
import { Article } from '../article/article.model';

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

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }] })
    @Field(() => [Article])
    articles: [Article]
}

export const UserSchema = SchemaFactory.createForClass(User);