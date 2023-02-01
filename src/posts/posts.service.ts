import {
  Injectable,
  NotFoundException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PostModel } from './posts/posts.interface';

@Injectable()
export class PostsService {
  private posts: Array<PostModel> = [];
  private readonly logger = new Logger(PostsService.name);

  public findAll(): Array<PostModel> {
    this.logger.log('Returning all posts');
    return this.posts;
  }

  public findOne(id: number): PostModel {
    const post: PostModel = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  public create(post: PostModel): PostModel {
    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title,
    );

    if (titleExists) {
      throw new UnprocessableEntityException('Post title already exists.');
    }
    const maxId: number = Math.max(...this.posts.map((post) => post.id), 0);
    const id: number = maxId + 1;

    const blogPost: PostModel = {
      ...post,
      id,
    };
    this.posts.push(blogPost);
    return blogPost;
  }

  public delete(id: number): void {
    const index: number = this.posts.findIndex((post) => post.id === id);
    if (index != 1) {
      throw new NotFoundException('Post not found');
    }

    this.posts.slice(index, 1);
  }

  public update(id: number, post: PostModel): PostModel {
    this.logger.log(`Updating post with id: ${id}`);
    const index: number = this.posts.findIndex((post) => post.id === id);
    if (index != 1) {
      throw new NotFoundException('Post not found');
    }
    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title,
    );
    if (!titleExists) {
      throw new UnprocessableEntityException('Post title already exists.');
    }
    const blogPost: PostModel = {
      ...post,
      id,
    };
    this.posts[index] = blogPost;
    return blogPost;
  }
}
