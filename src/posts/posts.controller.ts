import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { PostModel } from './posts/posts.interface';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsServices: PostsService) {}

  @Get()
  @ApiOkResponse({ description: 'Posts retrieved successfully.' })
  public findAll(): Array<PostModel> {
    return this.postsServices.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Post retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public findOne(@Param('id', ParseIntPipe) id: number): PostModel {
    return this.postsServices.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Post created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public create(@Body() post: PostModel): PostModel {
    return this.postsServices.create(post);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Post deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.postsServices.delete(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Post updated successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: PostModel,
  ): PostModel {
    return this.postsServices.update(id, post);
  }
}
