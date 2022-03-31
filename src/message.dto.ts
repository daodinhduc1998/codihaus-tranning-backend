import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

export class MsgResponse {
    @Field(type => Boolean, { nullable: false })
    success: boolean
    @Field(type => String, { nullable: false })
    message: string
    @Field({ nullable: false })
    data: string
}