import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { FilesInterceptor } from '@nestjs/platform-express'
import { existsSync, mkdirSync, unlinkSync } from 'fs'
import { diskStorage } from 'multer'

import { Review as ReviewModel } from './schemas/review.schema'
import { User as UserModel } from './schemas/user.schema'
import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { RemoveReviewDto } from './dto/remove-review.dto'


const uuid = require('uuid')


const chosenFields: Record<string, number> = {
  name: 1,
  photo: 1,
}

const getExtension = (fileName: string): string => {
  const i = fileName.lastIndexOf('.')
  if (i === -1) {
    throw new Error('file`s name is broken')
  }
  return fileName.slice(i + 1).toLowerCase()
}

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({ status: 200, type: UserModel })
  @Get('review-user/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.reviewsService.getById(id)
    return { name: user.name, photo: user.photo, stars: user.stars, countReviews: user.countReviews }
  }

  @ApiOperation({ summary: 'Create review' })
  @ApiResponse({ status: 200, type: ReviewModel })
  @Post('create-review')
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
          const uploadPath = `./public/${folder}/reviews`
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
    @Body() createReviewDto: CreateReviewDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<ReviewModel> {
    const images = []
    if (files.length > 0) {
      const folder = files[0].originalname.split('-')[0]
      const path = `${process.env.SERVER_PATH}${folder}/reviews/`

      files.forEach(file => {
        images.push(`${path}${file.filename}`)
      })
    }
    return await this.reviewsService.create({ ...createReviewDto, images }, 'authorId', chosenFields)
  }


  @ApiOperation({ summary: 'Delete review' })
  @ApiResponse({ status: 200, type: ReviewModel })
  @Post('remove-review')
  async remove(@Body() removeReviewDto: RemoveReviewDto): Promise<{ _id: string }> {
    const review = await this.reviewsService.remove(removeReviewDto)
    review.images.forEach(src => {
      const image = src.split('/').at(-1)
      unlinkSync(`./public/${removeReviewDto.userId}/reviews/${image}`)
    })
    return { _id: removeReviewDto._id }
  }

  @ApiOperation({ summary: 'Get all posts by author id' })
  @ApiResponse({ status: 200, type: [ReviewModel] })
  @Get('reviews-author/:id')
  async getAllPostsByAuthorId(@Param('id') id: string): Promise<ReviewModel[]> {
    return await this.reviewsService.getAllPostsByAuthorId(id, 'authorId', chosenFields)
  }

  @ApiOperation({ summary: 'Get all posts by user id' })
  @ApiResponse({ status: 200, type: [ReviewModel] })
  @Get('reviews')
  async getAllPostsByUserId(@Query() {
    id,
    page,
  }): Promise<{ reviews: ReviewModel[], count: number, pages: number }> {
    return await this.reviewsService.getAllPostsByUserId(id, page, 'authorId', chosenFields)
  }
}
