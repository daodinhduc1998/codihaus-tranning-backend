import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { ArticleService } from 'src/article/article.service';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.model';
import { Article, ArticleDocument } from 'src/article/article.model';
import { ArticleReCategory, ArticleReCategoryDocument } from 'src/_ArticleReCategory/ArticleReCategory.model';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import mongoose from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
        //@InjectModel(ArticleReCategory.name) private aRcModel: Model<ArticleReCategoryDocument>,
        //@InjectModel(Article.name) private articleModel: Model<ArticleDocument>
    ) { }

    async findLimit(limit: number) {
        return this.categoryModel.find({})
            .limit(Math.round(limit))
            .lean()
    }

    async findOneId(id: string) {
        return await this.categoryModel.findOne({ _id: id })
    }

    async findId(id: string) {
        return [this.categoryModel.findOne({ _id: id })]
    }

    async findAll(categories) {
        return this.categoryModel.find({ _id: { $in: categories } })
    }

    async createCategory(category: CreateCategoryDto) {
        const newCategory = new this.categoryModel(category)
        // const newArC = new this.aRcModel({ categories: newCategory._id, articles: category.idArticle })
        // await this.aRcModel.create(newArC)
        return this.categoryModel.create(newCategory)
    }


}