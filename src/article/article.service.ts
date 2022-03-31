import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { ArticleService } from 'src/article/article.service';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.model';
import { User, UserDocument } from 'src/user/user.model';
import { CreateArticleDto, UpdateArticleDto, QueryFind } from './article.dto';
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
        const newArticle = new this.articleModel({
            categories: [...article.categories],
            title: article.title,
            content: article.content,
            author: article.author,
            thumbnail: article.thumbnail
        })
        //await this.userModel.updateOne({ _id: article.author }, { $push: { articles: newArticle._id } })
        const status = await this.categoryModel.updateMany({ _id: { $in: article.categories } }, { $push: { articles: newArticle._id } })
        if (!status.acknowledged)
            return this.articleModel.create(newArticle)
        else
            return {}

    }

    async findListArticlebyUser(userId: string) {
        return this.articleModel.find({ author: userId }).lean()
    }


    async queryFind(query: QueryFind) {
        //Variable default
        const docInPage: number = 10
        const maxLimit: number = 100
        const pageDefault: number = 0

        //Validate param
        const action: Array<string> = ['findOne', 'find', 'findById']
        const option: string = action.includes(query.option) ? query.option : ""
        const limit: number = (query.limit > 0 && query.limit < maxLimit) ? Math.round(query.limit) : docInPage
        const id: string = query.id ? query.id : ""
        const page: number = query.page >= 0 ? Math.round(query.page) : pageDefault


        let queryBody: any = []
        if (option != 'find' && id) {
            //return single document
            queryBody.push({ $match: { _id: new mongoose.Types.ObjectId(id) } })
        } else {
            //return multiple document
            queryBody.push({ $sort: { _id: 1 } })
            if (page > 0) {
                //queryBody.push({ $match: { _id: { $gte: page * limit + 1 } } })
                queryBody.push({ $skip: page * limit })
            }
            queryBody.push({ $limit: limit })
        }
        return this.articleModel.aggregate(queryBody)
        //console.log(result)
        //return result
    }

    async deleteArticle(id: string) {
        return this.articleModel.findOneAndRemove({ _id: id })
    }
    async updateArticle(article: UpdateArticleDto) {
        const update = {}
        if (article.author)
            update["author"] = article.author
        if (article.title)
            update["title"] = article.title
        if (article.content)
            update["content"] = article.content
        if (article.thumbnail)
            update["thumbnail"] = article.thumbnail
        if (article.author)
            update["author"] = article.author
        if (article.categories)
            update["categories"] = article.categories
        return this.articleModel.findOneAndUpdate({ _id: article._id }, update)
    }

}