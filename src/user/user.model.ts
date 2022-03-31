

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';
import { Article } from '../article/article.model';
import * as bcrypt from 'bcrypt';

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
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: any) {
    let user = this as UserDocument;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }
    // Random additional data
    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hashSync(user.password, salt)

    // Replace the password with the hash
    user.password = hash;

    return next();
});

UserSchema.methods.comparePassword = async function (
    candidatePassword: string, password: string
) {
    return bcrypt.compare(candidatePassword, password).catch((e) => false);
};