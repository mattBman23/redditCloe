export interface Post {
  identifier: string;
  title: string;
  slug: string;
  body: string;
  subName: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  sub?: Sub;
  // virtual fields
  url: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
}

export interface User {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sub {
  createdAt: string;
  updatedAt: string;
  username: string;
  name: string;
  title: string;
  description: string;
  imageUrn: string;
  bannerUrn: string;
  posts: Post[];
  imageUrl: string;
  bannerUrl: string;
}

export interface Comment {
  createdAt: string;
  updatedAt: string;
  identifier: string;
  body: string;
  username: string;
  userVote: number;
  voteScore: number;
}
