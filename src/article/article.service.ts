import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { ArticleService } from 'src/article/article.service';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.model';
import { User, UserDocument } from 'src/user/user.model';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';
import { Category, CategoryDocument } from 'src/category/category.model';
import mongoose from 'mongoose';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findLimit(limit: number) {
        return this.articleModel.find().limit(Math.round(limit)).lean()
    }

    async findId(id: string) {
        return [this.articleModel.findById({ _id: id }).lean()]
    }

    async findAll(articles) {
        return this.articleModel.find({ _id: { $in: articles } })
    }

    async createArticle(article: CreateArticleDto) {
        console.log(article);
        const newArticle = new this.articleModel(article)
        await this.userModel.updateOne({ _id: article.author }, { $push: { articles: newArticle._id } })
        return this.articleModel.create(newArticle)
    }

    async createArticleR(article: CreateArticleDto) {
        console.log(article);
        const newArticle = new this.articleModel({
            categories: [article.categories],
            title: article.title,
            content: article.content,
            author: article.author,
            thumbnail: article.thumbnail
        })
        await this.userModel.updateOne({ _id: article.author }, { $push: { articles: newArticle._id } })
        await this.categoryModel.updateOne({ _id: article.categories }, { $push: { articles: newArticle._id } })
        return this.articleModel.create(newArticle)
    }

    async findListArticlebyUser(userId: string) {
        return this.articleModel.find({ author: userId }).lean()
    }

}