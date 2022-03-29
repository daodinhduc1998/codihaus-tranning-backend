import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { ArticleService } from 'src/article/article.service';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.model';
import { User, UserDocument } from 'src/user/user.model';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';
import mongoose from 'mongoose';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findLimit(limit: number) {
        return this.articleModel.find().limit(Math.round(limit)).lean()
    }

    async findId(id: string) {
        return [this.articleModel.findById({ _id: id }).lean()]
    }

    async createArticle(article: CreateArticleDto) {
        const newArticle = new this.articleModel(article)
        await this.userModel.updateOne({ _id: article.author }, { $push: { articles: newArticle._id } })
        return this.articleModel.create(newArticle)
    }

    async findListArticlebyUser(userId: string) {
        return this.articleModel.find({ author: userId }).lean()
    }

}