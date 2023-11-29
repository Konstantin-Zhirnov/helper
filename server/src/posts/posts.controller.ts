import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { FilesInterceptor } from '@nestjs/platform-express'

import { Post as PostModel } from './schemas/post.schema'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { diskStorage } from 'multer'
import { existsSync, mkdirSync, unlinkSync } from 'fs'
import { UpdatePostDto } from './dto/update-post.dto'
import { AddImagesDto } from './dto/add-images.dto'
import { RemoveImageDto } from './dto/remove-image.dto'
import { RemovePostDto } from './dto/remove-post.dto'

const uuid = require('uuid')


const chosenFields: Record<string, number> = {
  name: 1,
  email: 1,
  phone: 1,
  photo: 1,
  whatsapp: 1,
  telegram: 1,
  viber: 1,
  stars: 1,
  countReviews: 1,
}

const getExtension = (fileName: string): string => {
  const i = fileName.lastIndexOf('.')
  if (i === -1) {
    throw new Error('file`s name is broken')
  }
  return fileName.slice(i + 1).toLowerCase()
}

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {
  }


  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, type: [PostModel] })
  @Get('posts')
  async getAll(@Query() {
    location,
    search,
    page,
  }): Promise<{ posts: PostModel[], count: number, pages: number }> {
    return await this.postsService.getAll(location, search, page, 'authorId', chosenFields)
  }


  @ApiOperation({ summary: 'Get post' })
  @Get('post/:id')
  async findOne(@Param('id') id: string): Promise<PostModel> {
    return await this.postsService.findOneAndPopulate(id, 'authorId', chosenFields)
  }


  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: 200, type: PostModel })
  @Post('create-post')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('images', 5, {
    storage: diskStorage({
      destination: (req: any, file: any, cb: any) => {
        if (file) {
          const fileName = file.originalname
          const folder = fileName.substring(0, fileName.lastIndexOf('-'))
          const folderPath = `./public/${folder}`
          if (!existsSync(folderPath)) {
            mkdirSync(folderPath)
          }
          const uploadPath = `./public/${folder}/posts`
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath)
          }
          cb(null, uploadPath)
        }
      },
      filename: (req, file, callback) => {
        const name = `${uuid.v4()}.${getExtension(file.originalname)}`
        callback(null, name)
      },
    }),
  }) as any)
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<PostModel> {
    const images = []
    if (files.length > 0) {
      const folder = files[0].originalname.split('-')[0]
      const path = `${process.env.SERVER_PATH}${folder}/posts/`

      files.forEach(file => {
        images.push(`${path}${file.filename}`)
      })
    }
    return await this.postsService.create({ ...createPostDto, images }, 'authorId', chosenFields)
  }


  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: 200, type: PostModel })
  @Post('remove-post')
  async remove(@Body() removePostDto: RemovePostDto): Promise<{ _id: string }> {
    const post = await this.postsService.remove(removePostDto._id)
    post.images.forEach(src => {
      const image = src.split('/').at(-1)
      unlinkSync(`./public/${removePostDto.folder}/posts/${image}`)
    })
    return { _id: removePostDto._id }
  }

  @ApiOperation({ summary: 'Update post' })
  @ApiResponse({ status: 201, type: PostModel })
  @Put('update-post')
  async update(
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<UpdatePostDto> {
    await this.postsService.update(updatePostDto)
    return updatePostDto
  }

  @ApiOperation({ summary: 'Get all cities' })
  @ApiResponse({ status: 200, type: [String] })
  @Get('cities')
  async getCities(): Promise<unknown[]> {
    return await this.postsService.getLocations()
  }

  @ApiOperation({ summary: 'Get all posts by author id' })
  @ApiResponse({ status: 200, type: [PostModel] })
  @Get('posts/:id')
  async getAllPostsById(@Param('id') id: string): Promise<PostModel[]> {
    return await this.postsService.getAllPostsByAuthorId(id, 'authorId', chosenFields)
  }

  @ApiOperation({ summary: 'Add images' })
  @ApiResponse({ status: 200, type: PostModel })
  @Post('add-images')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('images', 5, {
    storage: diskStorage({
      destination: (req: any, file: any, cb: any) => {
        if (file) {
          const fileName = file.originalname
          const folder = fileName.substring(0, fileName.lastIndexOf('-'))
          const folderPath = `./public/${folder}`
          if (!existsSync(folderPath)) {
            mkdirSync(folderPath)
          }
          const uploadPath = `./public/${folder}/posts`
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath)
          }
          cb(null, uploadPath)
        }
      },
      filename: (req, file, callback) => {
        const name = `${uuid.v4()}.${getExtension(file.originalname)}`
        callback(null, name)
      },
    }),
  }) as any)
  async addImages(
    @Body() addImagesDto: AddImagesDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const images = []
    if (files.length > 0) {
      const folder = files[0].originalname.split('-')[0]
      const path = `${process.env.SERVER_PATH}${folder}/posts/`

      files.forEach(file => {
        images.push(`${path}${file.filename}`)
      })
    }
    const post = await this.postsService.addImages(addImagesDto, images)
    return { _id: addImagesDto._id, field: { images: post.images } }
  }

  @ApiOperation({ summary: 'Remove image' })
  @ApiResponse({ status: 201, type: PostModel })
  @Post('remove-image')
  async removeImage(
    @Body() removeImageDto: RemoveImageDto,
  ) {
    const post = await this.postsService.removeImage(removeImageDto)
    const image = removeImageDto.image.split('/').at(-1)
    unlinkSync(`./public/${removeImageDto.folder}/posts/${image}`)
    return { _id: removeImageDto._id, field: { images: post.images } }
  }
}
