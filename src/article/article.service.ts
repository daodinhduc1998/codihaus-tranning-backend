import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { ArticleService } from 'src/article/article.service';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.model';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';

@Injectable()
export class ArticlesService {
    constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) { }

    async getArticles(title?: string) {
        if (!title)
            return this.articleModel.find().lean()
        else {
            return [this.articleModel.findOne({ title: title }).lean()]
            //return this.userModel.findOne({ username: username }).lean()
        }
    }

    async createArticle(article: CreateArticleDto) {
        const newArticle = new this.articleModel({ article })
        return newArticle.save()
    }

}