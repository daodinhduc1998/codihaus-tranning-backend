import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { ArticleService } from 'src/article/article.service';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from 'src/article/article.model';
import { Category, CategoryDocument } from 'src/category/category.model';
import { ArticleReCategory, ArticleReCategoryDocument } from './ArticleReCategory.model';

import { CreateArticleDto, UpdateArticleDto } from '../article/article.dto';
import { User, UserDocument } from 'src/user/user.model';
import mongoose from 'mongoose';

@Injectable()
export class ArticleReCategoryService {
    constructor(
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
        @InjectModel(Category.name) private CategoryModel: Model<CategoryDocument>,
        @InjectModel(ArticleReCategory.name) private aRcModel: Model<ArticleReCategoryDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async findLimit(limit: number) {
        return this.articleModel.find().limit(Math.round(limit)).lean()
    }

    async filter2table(id: string, table: string, limit: number) {
        if (table == 'category') {
            return this.articleModel.find({ articles: id }).limit(limit).lean()
        } else {
            return this.articleModel.find({ categories: id }).limit(limit).lean()
        }

    }

    async createArticleRe(article: CreateArticleDto, arrIdCategory: string[]) {
        const newArticle = new this.articleModel({
            title: article.title,
            content: article.content,
            thumbnail: article.thumbnail,
            author: article.author
        })
        await this.userModel.updateOne({ _id: article.author }, { $push: { articles: newArticle._id } })
        //const newArC = new this.aRcModel({ articles: newArticle._id, categories: idCategory })
        //await this.aRcModel.create(newArC)
        return this.articleModel.create(newArticle)
    }


}