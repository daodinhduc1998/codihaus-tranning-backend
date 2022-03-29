import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { ArticleService } from 'src/article/article.service';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findLimit(limit: number) {
        return this.userModel.find().limit(Math.round(limit)).lean()
    }

    async findId(id: string) {
        return this.userModel.find({ _id: id }).lean();
    }


    async createUser(user: CreateUserDto) {
        const newUser = new this.userModel({
            username: user.username,
            password: user.password,
            email: user.email,
            name: user.name ? user.name : "",
            articles: []
        })
        return this.userModel.create(newUser)
        // return newUser.save()
    }

}