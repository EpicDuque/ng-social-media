export interface Post {
  author: string;
  content: string;
  time: number;
  likes: number;
  likeUids?: string[],
}