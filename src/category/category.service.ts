import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { ArticleService } from 'src/article/article.service';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.model';
import { Article, ArticleDocument } from 'src/article/article.model'
import { CreateCategoryDto, UpdateCategoryDto, DeleteCategoryDto } from './category.dto';
import mongoose from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>
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

    async find2Article(idCategory: string) {
        return this.articleModel.find({ categories: { $in: [idCategory] } })
    }

    async createCategory(category: CreateCategoryDto) {
        const newCategory = new this.categoryModel(category)
        return this.categoryModel.create(newCategory)
    }

    async updateCategory(category: UpdateCategoryDto) {
        const update = {}
        if (category.name) update["name"] = category.name
        if (category.description) update["description"] = category.description
        return this.categoryModel.findOneAndUpdate({ _id: category._id }, update)
    }

    async deleteCategory(category: DeleteCategoryDto) {
        this.categoryModel.findOneAndRemove({ _id: category._id })
            .then(cate => {
                return this.articleModel.updateMany({}, { $pull: { categories: { $in: [cate._id] } } })
            })
    }


}