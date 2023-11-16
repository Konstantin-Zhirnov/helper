import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'


import { User, UserDocument } from './schemas/user.schema'
import { Post, PostDocument } from './schemas/post.schema'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { AddImagesDto } from './dto/add-images.dto'
import { RemoveImageDto } from './dto/remove-image.dto'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

@Injectable()
export class PostsService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {
  }

  async create(createPostDto: CreatePostDto & { images: string[] }, fieldName: string, chosenFields: Record<string, number>): Promise<Post> {
    const postWithTime = {
      ...createPostDto,
      time: new Date().getTime(),
      location: capitalizeFirstLetter(createPostDto.location),
    }
    const post = new this.postModel(postWithTime)
    return (await post.save()).populate({
      path: fieldName,
      select: chosenFields,
    })
  }

  async findOneAndPopulate(id: string, fieldName: string, chosenFields: Record<string, number>) {
    return await this.postModel
      .findById(id)
      .populate({ path: fieldName, select: chosenFields })
      .exec()
  }

  async getAll(location: string = 'Nanaimo', search: string, page: number = 0, fieldName: string, chosenFields: Record<string, number>) {
    let options = {}

    if (search) {
      options = {
        location: capitalizeFirstLetter(location),
        $or: [
          { title: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
        ],
      }
    } else {
      options = {
        location: capitalizeFirstLetter(location),
      }
    }

    const query = this.postModel.find(options)
    const limit = 10

    const posts = await query
      .sort({ 'time': 'desc' })
      .skip(((parseInt(page as any) || 1) - 1) * limit)
      .limit(limit)
      .populate({
        path: fieldName,
        select: chosenFields,
      })

    const count = await this.postModel.countDocuments(options).exec()
    const pages = Math.floor((count - 1) / limit) + 1

    return { posts, count, pages, page: Number(page) }
  }

  async remove(id: string): Promise<Post> {
    return this.postModel.findByIdAndRemove(id)
  }

  async update(updatePostDto: UpdatePostDto): Promise<Post> {
    return this.postModel.findByIdAndUpdate(updatePostDto._id, updatePostDto.field, { new: true })
  }

  async getLocations(): Promise<unknown[]> {
    const locations = await this.postModel.find().select({ 'location': 1, '_id': 0 }).exec()
    const locationsSet = new Set()
    locations.forEach(location => {
      if (!locationsSet.has(location.location)) {
        locationsSet.add(location.location)
      }
    })
    return [...locationsSet]
  }

  async getAllPostsByAuthorId(authorId: string, fieldName: string, chosenFields: Record<string, number>): Promise<Post[]> {
    return await this.postModel.find({ 'authorId': authorId }).populate({
      path: fieldName,
      select: chosenFields,
    }).sort({ 'time': 'desc' }).exec()
  }

  async addImages(addImagesDto: AddImagesDto, images: string[]): Promise<Post> {
    const post = await this.postModel.findById(addImagesDto._id)
    return this.postModel.findByIdAndUpdate(addImagesDto._id, { images: [...post.images, ...images] }, { new: true })
  }

  async removeImage(removeImageDto: RemoveImageDto): Promise<Post> {
    const post = await this.postModel.findById(removeImageDto._id)
    return this.postModel.findByIdAndUpdate(removeImageDto._id, { images: post.images.filter(image => image !== removeImageDto.image) }, { new: true })
  }
}
