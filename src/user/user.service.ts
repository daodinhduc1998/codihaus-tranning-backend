import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { ArticleService } from 'src/article/article.service';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './user.model';
import { Article, ArticleDocument } from 'src/article/article.model';
import { CreateUserDto, UpdateUserDto, DeleteUserDto, LoginInput } from './user.dto';
import { MsgResponse } from 'src/message.dto';
import Ctx from '../context.type';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>
    ) { }

    async findLimit(limit: number) {
        return this.userModel.find().limit(Math.round(limit)).lean()
    }

    async findId(id: string) {
        return this.userModel.find({ _id: id }).lean();
    }

    async findOneId(id: string) {
        return this.userModel.findOne({ _id: id }).lean();
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

    async updateUser(user: UpdateUserDto) {
        const update = {}
        if (user.password) update["password"] = user.password
        if (user.email) update["email"] = user.email
        if (user.name) update["name"] = user.name
        return this.userModel.findOneAndUpdate({ username: user.username }, update)
    }

    async deleteUser(user: DeleteUserDto) {
        this.userModel.findOneAndRemove(user)
            .then(user1 => {
                return this.articleModel.deleteMany({ author: user1._id })
            })
    }

    async login({ username, password }: LoginInput) {
        const user = await this.userModel.findOne({ username }).select('-__v');
        //console.log(user);
        const status = await UserSchema.methods.comparePassword(password, user.password)
        //console.log(status);

        if (!user || !status) {
            throw new Error('Invalid username or password');
        }
        // const res = {
        //     success: true,
        //     message: "Login success",
        //     // data: user
        // }
        return user
    }
}