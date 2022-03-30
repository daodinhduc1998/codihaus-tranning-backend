
import { Field, InputType, ObjectType, Int, ID } from '@nestjs/graphql';
@InputType()
export class CreateCategoryDto {

    @Field({ nullable: false })
    name: string

    @Field({ nullable: true })
    description: string
}

@InputType()
export class UpdateCategoryDto {
    @Field({ nullable: false })
    name: string

    @Field({ nullable: true })
    description?: string

    @Field({ nullable: true })
    categories?: string
}