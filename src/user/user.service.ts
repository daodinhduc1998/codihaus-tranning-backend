import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { ArticleService } from 'src/article/article.service';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getUsers(id?: string) {
        if (!id)
            return this.userModel.find().lean()
        else {
            return [this.userModel.findOne({ _id: id }).lean()]
            //return this.userModel.findOne({ username: username }).lean()
        }
    }

    async createUser(user: CreateUserDto) {
        const newUser = new this.userModel({
            username: user.username,
            password: user.password,
            email: user.email,
            name: user.name ? user.name : "",
            articles: []
        })
        console.log(newUser);
        return newUser.save()
    }

}