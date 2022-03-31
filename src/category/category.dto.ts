
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
    _id: string

    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    description?: string
}

@InputType()
export class DeleteCategoryDto {
    @Field({ nullable: true })
    _id: string

    @Field({ nullable: false })
    name: string

}