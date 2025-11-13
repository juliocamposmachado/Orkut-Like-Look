
export interface User {
  id: number;
  email: string;
  password?: string; // Should not be sent to client in a real app
  name: string;
  avatar: string;
  status?: 'online' | 'offline';
  mood?: string;
  profile: {
    bio: string;
    interests: string[];
    music: string[];
    movies: string[];
  };
  friendIds: number[];
}

export interface Post {
  id: number;
  authorId: number;
  text: string;
  imageUrl?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export interface Comment {
  id: number;
  authorId: number;
  text: string;
}

export interface Community {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  memberIds: number[];
}

export interface Recado {
  id: number;
  authorId: number;
  text: string;
  timestamp: string;
}

export interface Depoimento {
  id: number;
  authorId: number;
  text: string;
  status: 'approved' | 'pending';
  timestamp: string;
}

export interface Photo {
  id: number;
  url: string;
  caption: string;
  comments: Comment[];
}
