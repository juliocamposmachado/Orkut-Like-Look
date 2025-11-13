export type RatingCategory = 'confiável' | 'legal' | 'sexy';

export interface Rating {
  category: RatingCategory;
  count: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  fullName: string;
  relationshipStatus: string;
  city: string;
  state: string;
  country: string;
  fans: number;
  photos: number;
  videos: number;
  ratings: Rating[];
  friends: number[];
  communities: number[];
}

export interface Scrap {
  id: number;
  authorId: number;
  recipientId: number;
  content: string;
  timestamp: string;
}

export interface Testimonial {
  id:number;
  authorId: number;
  recipientId: number;
  content: string;
  timestamp: string;
}

export interface Community {
  id: number;
  name: string;
  imageUrl: string;
  members: number;
}

export type View = 'home' | 'profile' | 'friends' | 'communities';